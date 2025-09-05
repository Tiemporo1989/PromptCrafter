import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Brain, Settings, Copy, Download, RefreshCw, Eye, Code, Sparkles, CheckCircle } from 'lucide-react';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';
import { enhancePrompt } from '../services/aiService';
import { PromptData, EnhancedPrompt } from '../types';

interface MainAppProps {
  onBack: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ onBack }) => {
  const [promptData, setPromptData] = useState<PromptData>({
    input: '',
    outputType: 'general',
    tone: 'professional',
    detail: 'medium',
    constraints: []
  });
  
  const [enhancedPrompt, setEnhancedPrompt] = useState<EnhancedPrompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDevView, setShowDevView] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleEnhance = async () => {
    if (!promptData.input.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await enhancePrompt(promptData);
      setEnhancedPrompt(result);
    } catch (error) {
      console.error('Error enhancing prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!enhancedPrompt) return;
    
    try {
      await navigator.clipboard.writeText(enhancedPrompt.content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
    if (!enhancedPrompt) return;
    
    const blob = new Blob([enhancedPrompt.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enhanced-prompt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </motion.button>
              
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-indigo-400" />
                <span className="text-xl font-bold text-white">PromptCrafter</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDevView(!showDevView)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  showDevView 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Code className="h-4 w-4" />
                Dev View
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg text-sm font-medium transition-all"
              >
                <Settings className="h-4 w-4" />
                Settings
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <InputPanel
              promptData={promptData}
              onUpdate={setPromptData}
              onEnhance={handleEnhance}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <OutputPanel
              enhancedPrompt={enhancedPrompt}
              isLoading={isLoading}
              showDevView={showDevView}
              onCopy={handleCopy}
              onDownload={handleDownload}
              copySuccess={copySuccess}
            />
          </motion.div>
        </div>

        {/* Action Bar */}
        <AnimatePresence>
          {enhancedPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Prompt Enhanced!</h3>
                    <p className="text-gray-400 text-sm">Ready to use with your favorite AI model</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    {copySuccess ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnhance}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refine
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Getting Started Guide */}
        {!promptData.input && !enhancedPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <Sparkles className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Create?</h3>
              <p className="text-gray-400 mb-4 max-w-md mx-auto">
                Start by entering your idea in the input panel. Our AI will transform it into a powerful, structured prompt.
              </p>
              <div className="text-sm text-gray-500">
                Example: "Create a modern website for a coffee shop"
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MainApp;