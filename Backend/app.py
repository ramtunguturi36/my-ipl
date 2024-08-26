from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
import os

nltk.download('punkt')

app = Flask(__name__)
CORS(app)

# Set the API key
genai.configure(api_key="AIzaSyDm-jbXPwcgDKFZvD9uxpDtzQwDq7dy-Xc")

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Load custom text files
def load_text_files(directory):
    documents = []
    for filename in os.listdir(directory):
        if filename.endswith(".txt"):
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as file:
                documents.append(file.read())
    return documents

# Preprocess and vectorize documents
def preprocess_and_vectorize(documents):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)
    return vectorizer, tfidf_matrix

# Retrieve the most relevant document
def retrieve_relevant_document(query, vectorizer, tfidf_matrix):
    query_vector = vectorizer.transform([query])
    similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    most_similar_index = similarities.argmax()
    return documents[most_similar_index], similarities[most_similar_index]

# Load and preprocess custom text files
documents = load_text_files('rim')
vectorizer, tfidf_matrix = preprocess_and_vectorize(documents)

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    user_message = data['query']
    
    # Retrieve the most relevant document
    relevant_document, similarity_score = retrieve_relevant_document(user_message, vectorizer, tfidf_matrix)
    
    # Append the retrieved document to the query for the generative model
    contextual_query = f"Context: {relevant_document}\n\nQuery: {user_message}"
    
    # Start a chat session with the model
    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(contextual_query)
    
    return jsonify({'answer': response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
