import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { PromptData } from '../types';

interface InputPanelProps {
  promptData: PromptData;
  onUpdate: (data: PromptData) => void;
  onEnhance: () => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ promptData, onUpdate, onEnhance, isLoading }) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const outputTypes = [
    { value: 'general', label: 'General' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'code', label: 'Code' },
    { value: 'image', label: 'Image Generation' },
    { value: 'design', label: 'Design Brief' },
    { value: 'summary', label: 'Summary' },
    { value: 'creative', label: 'Creative Writing' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'witty', label: 'Witty' },
    { value: 'technical', label: 'Technical' }
  ];

  const detailLevels = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'comprehensive', label: 'Comprehensive' }
  ];

  const constraints = [
    { value: 'word-count', label: 'Include Word Count' },
    { value: 'no-jargon', label: 'Avoid Jargon' },
    { value: 'include-examples', label: 'Include Examples' },
    { value: 'step-by-step', label: 'Step-by-step Format' },
    { value: 'include-stats', label: 'Include Statistics' }
  ];

  const handleInputChange = (field: keyof PromptData, value: any) => {
    onUpdate({ ...promptData, [field]: value });
  };

  const handleConstraintToggle = (constraint: string) => {
    const newConstraints = promptData.constraints.includes(constraint)
      ? promptData.constraints.filter(c => c !== constraint)
      : [...promptData.constraints, constraint];
    handleInputChange('constraints', newConstraints);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          Input Your Idea
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Describe what you want to create and we'll enhance it
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Idea
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            value={promptData.input}
            onChange={(e) => handleInputChange('input', e.target.value)}
            placeholder="e.g., Design a landing page for a SaaS product that helps teams collaborate better..."
            className="w-full h-32 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all resize-none"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {promptData.input.length} characters
          </div>
        </div>

        {/* Basic Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Output Type
            </label>
            <select
              value={promptData.outputType}
              onChange={(e) => handleInputChange('outputType', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
            >
              {outputTypes.map(type => (
                <option key={type.value} value={type.value} className="bg-slate-800">
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tone
            </label>
            <select
              value={promptData.tone}
              onChange={(e) => handleInputChange('tone', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
            >
              {tones.map(tone => (
                <option key={tone.value} value={tone.value} className="bg-slate-800">
                  {tone.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium"
        >
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          Advanced Options
        </motion.button>

        {/* Advanced Options */}
        <motion.div
          initial={false}
          animate={{ height: showAdvanced ? 'auto' : 0, opacity: showAdvanced ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pt-2">
            {/* Detail Level */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Level of Detail
              </label>
              <div className="grid grid-cols-3 gap-2">
                {detailLevels.map(level => (
                  <motion.button
                    key={level.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInputChange('detail', level.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      promptData.detail === level.value
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {level.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Additional Requirements
              </label>
              <div className="space-y-2">
                {constraints.map(constraint => (
                  <motion.label
                    key={constraint.value}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={promptData.constraints.includes(constraint.value)}
                      onChange={() => handleConstraintToggle(constraint.value)}
                      className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-400/20"
                    />
                    <span className="text-gray-300 text-sm">{constraint.label}</span>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnhance}
          disabled={!promptData.input.trim() || isLoading}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              Enhancing...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Enhance Prompt
            </>
          )}
        </motion.button>

        {/* Quick Tips */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
          <h4 className="text-indigo-300 font-medium text-sm mb-2">💡 Pro Tips:</h4>
          <ul className="text-indigo-200 text-xs space-y-1">
            <li>• Be specific about your goal and target audience</li>
            <li>• Include context about the domain or industry</li>
            <li>• Mention any constraints or requirements upfront</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;