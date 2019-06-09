"""
    code by TaeHwan Jung(@graykode)
    Original Paper and repository here : https://github.com/openai/gpt-2
    GPT2 Pytorch Model : https://github.com/huggingface/pytorch-pretrained-BERT
"""
import os
import sys
import torch
import random
import argparse
import numpy as np
from GPT2.model import GPT2LMHeadModel
from GPT2.utils import load_weight
from GPT2.config import GPT2Config
from GPT2.sample import sample_sequence
from GPT2.encoder import get_encoder

from flask import Flask

app = Flask(__name__)

EXAMPLE_LETTER = """
Dear Congressman Whittier,

My name is Edgar, I am a concerned citizen in San Francisco and I care deeply about parks in California.
Climate change is a serious issue and the additional removal of forests in my state by
the federal government is deeply concerning to me. I prefer to have to take deep action against the corporate interests that
are continously removing the forests that I care about.
Please look at the magestic photos that I have enclosed and care about, these are the heart and soul of the
great state of california.


"""


def text_generator(state_dict, given_starting_letter):
    seed = random.randint(0, 2147483647)
    np.random.seed(seed)
    torch.random.manual_seed(seed)
    torch.cuda.manual_seed(seed)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    enc = get_encoder()
    config = GPT2Config()
    model = GPT2LMHeadModel(config)
    model = load_weight(model, state_dict)
    model.to(device)
    model.eval()
    context_tokens = enc.encode(EXAMPLE_LETTER)
    generated = 0
    out = sample_sequence(
        model=model,
        length=config.n_ctx // 2,
        context=context_tokens,
        start_token=None,
        batch_size=1,
        temperature=0.7,
        top_k=40,
        device=device,
    )
    out = out[:, len(context_tokens) :].tolist()
    text = enc.decode(out[0])
    print(text)
    return text


state_dict = torch.load(
    "gpt2-pytorch_model.bin",
    map_location="cpu" if not torch.cuda.is_available() else None,
)


def make_pdf(letter_text):
    from fpdf import FPDF

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, letter_text, 1, 1, "C")
    return pdf.output(dest="S").encode("latin-1")


@app.route("/letter.pdf")
def hello_world():
    print("called app home route, generate pdf")
    result = text_generator(state_dict, "climate change forests")
    print("Turning into PDF")
    r = result.replace("\n\n\n", "\n")
    r = r.replace("\n\n", "\n")
    print(repr(r))
    return make_pdf(r)
