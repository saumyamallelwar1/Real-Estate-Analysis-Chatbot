import React, { useState, useRef, useEffect } from 'react';
 import { Send, Upload, BarChart3, TrendingUp, MapPin } from 'lucide-react';
 import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
 import axios from 'axios';
 import './App.css';
 const API_BASE_URL = 'http://localhost:8000/api';
 function App() {
 const [messages, setMessages] = useState([
 {
 type: 'bot',
 text: 'Hello! I can help you analyze real estate data. Try asking me:',
 suggestions: [
 'Analyze Wakad',
 'Compare Ambegaon Budruk and Aundh',
 'Show price growth for Akurdi'
 ]
 }
 ]);
 const [input, setInput] = useState('');
 const [loading, setLoading] = useState(false);
 const [uploadedFile, setUploadedFile] = useState(null);
 const messagesEndRef = useRef(null);
 const fileInputRef = useRef(null);
 const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 };
 useEffect(() => {
 scrollToBottom();
 }, [messages]);
 const handleFileUpload = async (event) => {
 const file = event.target.files[0];
 if (!file) return;
 const formData = new FormData();
    formData.append('file', file);
 try {
 setLoading(true);
 const response = await axios.post(`${API_BASE_URL}/upload/`, formData, {
 headers: {
 'Content-Type': 'multipart/form-data',
},
 });
 setUploadedFile(file.name);
 setMessages(prev => [...prev, {
 type: 'bot',
 text: `File "${file.name}" uploaded successfully! You can now ask questions about the data.`
 }]);
 } catch (error) {
 setMessages(prev => [...prev, {
 type: 'bot',
 text: 'Error uploading file. Please try again.'
 }]);
 } finally {
 setLoading(false);
 }
 };
 const handleSend = async () => {
 if (!input.trim()) return;
 const userMessage = { type: 'user', text: input };
 setMessages(prev => [...prev, userMessage]);
 setLoading(true);
 try {
 const response = await axios.post(`${API_BASE_URL}/analyze/`, {
 query: input
 });
 const { summary, chart_data, table_data, query_type } = response.data;
 const botMessage = {
 type: 'bot',
 text: summary,
 chartData: chart_data,
 tableData: table_data,
 queryType: query_type
 };
 setMessages(prev => [...prev, botMessage]);
 } catch (error) {
 setMessages(prev => [...prev, {
 type: 'bot',
 text: 'I couldn\'t process your request. Please try rephrasing your question.',
 suggestions: [
 'Analyze Wakad',
]
 'Compare Ambegaon Budruk and Aundh',
 'Show price growth for Akurdi'
 }]);
 } finally {
 setLoading(false);
 setInput('');
 }
 };
 const handleSuggestionClick = (suggestion) => {
 setInput(suggestion);
 };
 return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
 <div className="max-w-6xl mx-auto">
 <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <MapPin size={32} />
 <div>
 <h1 className="text-2xl font-bold">Real Estate Analysis Chatbot</h1>
 <p className="text-blue-100 text-sm">Get insights on Pune real estate market</p>
 </div>
 </div>
 <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-color
 >
 <Upload size={18} />
 <span className="text-sm font-medium">Upload Data</span>
 </button>
 <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
 />
 </div>
 </div>
 <div className="h-[600px] overflow-y-auto p-6 space-y-4 bg-gray-50">
 {messages.map((msg, idx) => (
 <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-20
                  <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                  
                  {msg.suggestions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(sug)}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition-colors"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.chartData && msg.chartData.length > 0 && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-gray-800">
                          {msg.queryType === 'comparison' ? 'Comparative Analysis' : 'Price & Demand Trends'}
                        </h3>
                      </div>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={msg.chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          {msg.queryType === 'comparison' ? (
                            Object.keys(msg.chartData[0] || {})
                              .filter(key => key.includes('_price'))
                              .map((key, i) => (
                                <Line
                                  key={key}
                                  yAxisId="left"
                                  type="monotone"
                                  dataKey={key}
                                  stroke={i === 0 ? '#3b82f6' : '#8b5cf6'}
                                  strokeWidth={2}
                                  name={key.replace('_', ' ').toUpperCase()}
                                />
                              ))
) : (
 <>
 <Line yAxisId="left" type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} name="Avg 
<Line yAxisId="right" type="monotone" dataKey="demand" stroke="#10b981" strokeWidth={2} name="
 </>
 )}
 </LineChart>
 </ResponsiveContainer>
 </div>
 )}
 {msg.tableData && msg.tableData.length > 0 && (
 <div className="mt-4 overflow-x-auto">
 <div className="flex items-center gap-2 mb-3">
 <BarChart3 size={18} className="text-blue-600" />
 <h3 className="font-semibold text-gray-800">Detailed Data</h3>
 </div>
 <table className="w-full text-xs border-collapse">
 <thead>
 <tr className="bg-blue-50">
 <th className="border border-gray-300 p-2 text-left">Area</th>
 <th className="border border-gray-300 p-2 text-left">Year</th>
 <th className="border border-gray-300 p-2 text-left">Avg Price</th>
 <th className="border border-gray-300 p-2 text-left">Demand</th>
 <th className="border border-gray-300 p-2 text-left">Size</th>
 <th className="border border-gray-300 p-2 text-left">Inventory</th>
 </tr>
 </thead>
 <tbody>
 {msg.tableData.map((row, i) => (
 <tr key={i} className="hover:bg-gray-50">
 <td className="border border-gray-300 p-2">{row.area}</td>
 <td className="border border-gray-300 p-2">{row.year}</td>
 <td className="border border-gray-300 p-2">₹{row.avg_price}</td>
 <td className="border border-gray-300 p-2">{row.demand}</td>
 <td className="border border-gray-300 p-2">{row.size}</td>
 <td className="border border-gray-300 p-2">{row.inventory}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>
 </div>
 ))}
12. frontend/src/App.css
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                placeholder="Ask about real estate analysis..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-50
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                 className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 }
 export default App;