from flask import Flask

app = Flask(__name__)

def interpolate(input_string):
    some_message = f'''
    Hello Congressman Whittier,

    My name is {}
    '''
    return some_message

@app.route("/")
def hello_world():
    return "Hello, World!"
