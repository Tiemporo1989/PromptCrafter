import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, Eye, Code, Sparkles, Loader, CheckCircle, RefreshCw } from 'lucide-react';
import { EnhancedPrompt } from '../types';

interface OutputPanelProps {
  enhancedPrompt: EnhancedPrompt | null;
  isLoading: boolean;
  showDevView: boolean;
  onCopy: () => void;
  onDownload: () => void;
  copySuccess: boolean;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  enhancedPrompt,
  isLoading,
  showDevView,
  onCopy,
  onDownload,
  copySuccess
}) => {
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden h-fit">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              Enhanced Prompt
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              AI-optimized and ready to use
            </p>
          </div>

          {enhancedPrompt && (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  showPreview 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Eye className="h-4 w-4" />
                Preview
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCopy}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-all"
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
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-4"
              >
                <Sparkles className="h-12 w-12 text-indigo-400" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">Enhancing Your Prompt</h3>
              <p className="text-gray-400 text-center max-w-sm">
                Our AI is analyzing your input and crafting the perfect prompt structure...
              </p>
              <div className="mt-6 flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 bg-indigo-400 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          ) : enhancedPrompt ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {enhancedPrompt.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium border border-indigo-500/30"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Main Content */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  className="bg-slate-900/50 border border-white/10 rounded-xl p-4 min-h-[300px]"
                >
                  <pre 
                    className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto"
                    style={{ fontFamily: 'Fira Code, monospace' }}
                  >
                    {enhancedPrompt.content}
                  </pre>
                </motion.div>

                {/* Copy overlay */}
                <AnimatePresence>
                  {copySuccess && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center justify-center backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2 text-green-300 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        Copied to clipboard!
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-white">
                    {enhancedPrompt.content.split(' ').length}
                  </div>
                  <div className="text-xs text-gray-400">Words</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-white">
                    {enhancedPrompt.content.length}
                  </div>
                  <div className="text-xs text-gray-400">Characters</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-indigo-400">
                    {enhancedPrompt.score}%
                  </div>
                  <div className="text-xs text-gray-400">Quality</div>
                </div>
              </div>

              {/* Dev View */}
              <AnimatePresence>
                {showDevView && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/10 pt-6"
                  >
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Debug Information
                    </h4>
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                      <pre className="text-xs text-gray-400 overflow-x-auto">
                        {JSON.stringify(enhancedPrompt.debugInfo, null, 2)}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Preview */}
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/10 pt-6"
                  >
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Output Preview
                    </h4>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                      <p className="text-amber-200 text-sm">
                        {enhancedPrompt.previewOutput || "This is what an AI might generate when given your enhanced prompt. The actual output will vary based on the AI model and additional context."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-all"
                >
                  <Download className="h-4 w-4" />
                  Download
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refine
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No prompt yet</h3>
              <p className="text-gray-500 text-center max-w-sm">
                Enter your idea in the input panel and click "Enhance Prompt" to see the magic happen.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OutputPanel;