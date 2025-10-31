// src/pages/ChatScreen.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Container, Card, Row, Col, Form, Button,InputGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { companionData } from '../data/Companions'; // Adjust path if necessary

// Component for a single message bubble
const MessageBubble = ({ text, isSelf, companion }) => {
  const alignClass = isSelf ? 'ms-auto text-end' : 'me-auto text-start';
  const bubbleClass = isSelf ? 'bg-primary text-white' : 'bg-light text-dark border';

  return (
    <div className={`d-flex mb-3 ${alignClass} w-75`}>
      {!isSelf && (
        <img 
          src={companion.image} 
          alt={`${companion.name}`} 
          className="rounded-circle me-2" 
          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
        />
      )}
      <div 
        className={`p-3 rounded-4 shadow-sm ${bubbleClass}`}
        style={{ maxWidth: '80%', wordBreak: 'break-word' }}
      >
        {text}
      </div>
    </div>
  );
};

const ChatScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const companion = useMemo(() => 
    companionData.find(c => c.id === parseInt(id))
  , [id]);

  // Initial messages to simulate conversation history
  const initialMessages = companion ? [
    { id: 1, text: `Hey ${companion.name}! I'm excited we connected on TripMate.`, isSelf: true },
    { id: 2, text: `That's great! Thanks for reaching out. I saw your profile—Jammu & Kashmir (Trek) in October, right?`, isSelf: false },
    { id: 3, text: `Yep! I'm finalized on the dates. Have you thought about the route yet?`, isSelf: true },
    { id: 4, text: `I have a few ideas, but let's discuss the itinerary! This chat is the first step. 😊`, isSelf: false }
  ] : [];
  
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  // Auto-scroll logic (required for chat UI)
  useEffect(() => {
    const chatBody = document.getElementById('chat-body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [messages]);

  if (!companion) {
    return <Container className="my-5 text-center"><h2>Chat Error: Companion Not Found</h2></Container>;
  }

  // Simulate sending a message (only adds to the 'self' side)
  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      isSelf: true
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg border-0 rounded-4">
        
        {/* Chat Header: Personalized with Companion's Info */}
        <Card.Header className="card-gradient-blue-green text-white p-3 rounded-top-4">
          <Row className="align-items-center">
            <Col xs="auto">
                <Button variant="light" onClick={() => navigate(-1)} className="fw-bold me-3">
                    &larr;
                </Button>
            </Col>
            <Col className="d-flex align-items-center">
                <img 
                  src={companion.image} 
                  alt={companion.name} 
                  className="rounded-circle me-3 border border-2 border-white" 
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <h3 className="mb-0 fw-bold text-white">{companion.name}</h3>
            </Col>
          </Row>
        </Card.Header>
        
        <Card.Body 
          id="chat-body"
          className="p-4" 
          style={{ height: '550px', overflowY: 'auto', backgroundColor: 'var(--color-bg-light)' }}
        >
          {/* Message History */}
          {messages.map(msg => (
            <MessageBubble 
              key={msg.id} 
              text={msg.text} 
              isSelf={msg.isSelf} 
              companion={companion}
            />
          ))}
          
        </Card.Body>
        
        <Card.Footer className="p-3 bg-white border-top">
          {/* Message Input Form */}
          <Form onSubmit={handleSend}>
            <InputGroup>
              <Form.Control
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-start-pill border-end-0"
              />
              <Button 
                variant="primary" 
                type="submit" 
                className="fw-bold rounded-end-pill"
              >
                Send
              </Button>
            </InputGroup>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ChatScreen;