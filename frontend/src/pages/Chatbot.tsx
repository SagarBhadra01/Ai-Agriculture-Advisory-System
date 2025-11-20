import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your AgriAdvisor assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I understand you have a query about farming. Could you please provide more specific details so I can assist you better?',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] sm:h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Smart Assistant</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Ask anything about crops, pests, or weather.</p>
      </div>

      <Card padding="none" className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div
                className={`flex max-w-[85%] sm:max-w-[80%] gap-2 sm:gap-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-primary-600'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="h-4 w-4 sm:h-5 sm:w-5" /> : <Bot className="h-4 w-4 sm:h-5 sm:w-5" />}
                </div>
                <div
                  className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm sm:text-base break-words">{msg.text}</p>
                  <span className={`text-xs mt-1 block ${msg.sender === 'user' ? 'text-primary-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 sm:py-2.5 ml-9 sm:ml-11">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim() || isTyping} className="shrink-0">
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
