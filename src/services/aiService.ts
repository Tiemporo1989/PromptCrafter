import { PromptData, EnhancedPrompt } from '../types';

// Mock AI service - in a real app, this would call actual AI APIs
export const enhancePrompt = async (promptData: PromptData): Promise<EnhancedPrompt> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate enhanced prompt based on input
  const enhancedContent = generateEnhancedPrompt(promptData);
  
  return {
    content: enhancedContent,
    tags: generateTags(promptData),
    score: calculateQualityScore(promptData),
    debugInfo: {
      intent: detectIntent(promptData.input),
      audience: classifyAudience(promptData),
      structure: analyzeStructure(promptData),
      enhancements: listEnhancements(promptData)
    },
    previewOutput: generatePreviewOutput(promptData)
  };
};

const generateEnhancedPrompt = (data: PromptData): string => {
  const { input, outputType, tone, detail, constraints } = data;
  
  let prompt = `Act as a world-class expert in ${getExpertiseArea(outputType)} with extensive experience in creating high-quality ${outputType} content. Given the following context, criteria, and instructions, ${getActionVerb(outputType)} that meets professional standards and user expectations.

## Context
${enhanceContext(input)}

## Objective
${formulateObjective(input, outputType)}

## Approach
${getApproach(tone, detail)}

## Instructions
${generateInstructions(data)}`;

  if (constraints.includes('step-by-step')) {
    prompt += `\n\n## Step-by-Step Process
${generateStepByStep(outputType)}`;
  }

  if (constraints.includes('include-examples')) {
    prompt += `\n\n## Examples
${generateExamples(outputType)}`;
  }

  if (constraints.includes('word-count')) {
    prompt += `\n\n## Requirements
- Target length: ${getWordCount(detail)} words
- Maintain quality over quantity`;
  }

  if (constraints.includes('include-stats')) {
    prompt += `\n- Include relevant statistics and data points where applicable`;
  }

  if (constraints.includes('no-jargon')) {
    prompt += `\n- Use clear, accessible language avoiding technical jargon`;
  }

  prompt += `\n\n## Output Format
Structure your response with clear headings, bullet points where appropriate, and ensure ${getToneDescription(tone)} throughout.

Begin your response now:`;

  return prompt;
};

const enhanceContext = (input: string): string => {
  return `The user wants to ${input.toLowerCase()}. This requires understanding the specific needs, target audience, and desired outcomes to create an effective solution.`;
};

const formulateObjective = (input: string, outputType: string): string => {
  const objectives = {
    blog: `Create an engaging and informative blog post about: ${input}`,
    code: `Develop clean, efficient, and well-documented code for: ${input}`,
    image: `Generate a detailed image prompt for: ${input}`,
    design: `Create a comprehensive design brief for: ${input}`,
    summary: `Provide a concise and comprehensive summary of: ${input}`,
    creative: `Craft creative and engaging content about: ${input}`,
    general: `Provide a comprehensive response to: ${input}`
  };
  
  return objectives[outputType as keyof typeof objectives] || objectives.general;
};

const getExpertiseArea = (outputType: string): string => {
  const areas = {
    blog: 'content marketing and professional writing',
    code: 'software development and programming',
    image: 'visual design and AI image generation',
    design: 'user experience and visual design',
    summary: 'information synthesis and communication',
    creative: 'creative writing and storytelling',
    general: 'the relevant field'
  };
  
  return areas[outputType as keyof typeof areas] || areas.general;
};

const getActionVerb = (outputType: string): string => {
  const verbs = {
    blog: 'write a comprehensive blog post',
    code: 'develop a complete solution',
    image: 'create a detailed image generation prompt',
    design: 'design a comprehensive solution',
    summary: 'provide a thorough summary',
    creative: 'create engaging content',
    general: 'provide a comprehensive response'
  };
  
  return verbs[outputType as keyof typeof verbs] || verbs.general;
};

const getApproach = (tone: string, detail: string): string => {
  const toneApproaches = {
    professional: 'Maintain a professional, authoritative tone while ensuring clarity and precision.',
    casual: 'Use a conversational, approachable tone that feels natural and engaging.',
    friendly: 'Adopt a warm, welcoming tone that builds connection with the audience.',
    formal: 'Employ formal language and structure appropriate for official or academic contexts.',
    witty: 'Incorporate humor and clever insights while maintaining substance and value.',
    technical: 'Use precise technical language appropriate for expert audiences.'
  };

  const detailApproaches = {
    short: 'Focus on the most essential points with concise explanations.',
    medium: 'Provide balanced coverage with adequate detail and examples.',
    comprehensive: 'Include thorough analysis, multiple perspectives, and extensive detail.'
  };

  return `${toneApproaches[tone as keyof typeof toneApproaches]} ${detailApproaches[detail as keyof typeof detailApproaches]}`;
};

const generateInstructions = (data: PromptData): string => {
  const baseInstructions = [
    '1. Begin with a clear introduction that establishes context and relevance',
    '2. Organize content with logical flow and clear transitions',
    '3. Support key points with evidence, examples, or explanations',
    '4. Conclude with actionable insights or clear takeaways'
  ];

  if (data.constraints.includes('step-by-step')) {
    baseInstructions.push('5. Present information in a clear, sequential format');
  }

  return baseInstructions.join('\n');
};

const generateStepByStep = (outputType: string): string => {
  const steps = {
    blog: '1. Hook the reader with an engaging opening\n2. Present the main topic with supporting evidence\n3. Provide actionable insights or solutions\n4. End with a compelling call-to-action',
    code: '1. Analyze requirements and constraints\n2. Design the solution architecture\n3. Implement core functionality\n4. Add error handling and optimization\n5. Document and test the solution',
    design: '1. Research and understand user needs\n2. Define design objectives and constraints\n3. Create wireframes and mockups\n4. Iterate based on feedback\n5. Prepare final deliverables'
  };

  return steps[outputType as keyof typeof steps] || 'Follow a logical progression from problem identification to solution implementation.';
};

const generateExamples = (outputType: string): string => {
  return `Include 2-3 relevant examples that illustrate key concepts and provide practical context for the ${outputType}.`;
};

const getWordCount = (detail: string): string => {
  const counts = {
    short: '300-500',
    medium: '800-1200',
    comprehensive: '1500-2500'
  };
  
  return counts[detail as keyof typeof counts] || counts.medium;
};

const getToneDescription = (tone: string): string => {
  const descriptions = {
    professional: 'maintaining professional credibility',
    casual: 'keeping the tone conversational and accessible',
    friendly: 'creating a welcoming and supportive atmosphere',
    formal: 'adhering to formal writing conventions',
    witty: 'incorporating appropriate humor and cleverness',
    technical: 'using precise technical terminology'
  };
  
  return descriptions[tone as keyof typeof descriptions] || descriptions.professional;
};

const generateTags = (data: PromptData): string[] => {
  const tags = [];
  
  // Add output type tag
  tags.push(`${data.outputType}-ready`);
  
  // Add tone tag
  tags.push(data.tone);
  
  // Add detail level tag
  tags.push(`${data.detail}-detail`);
  
  // Add constraint tags
  if (data.constraints.includes('step-by-step')) tags.push('structured');
  if (data.constraints.includes('include-examples')) tags.push('example-rich');
  if (data.constraints.includes('no-jargon')) tags.push('accessible');
  if (data.constraints.includes('include-stats')) tags.push('data-driven');
  
  return tags;
};

const calculateQualityScore = (data: PromptData): number => {
  let score = 70; // Base score
  
  // Add points for input quality
  if (data.input.length > 50) score += 10;
  if (data.input.length > 100) score += 5;
  
  // Add points for customization
  if (data.tone !== 'professional') score += 5;
  if (data.detail === 'comprehensive') score += 10;
  if (data.constraints.length > 0) score += data.constraints.length * 2;
  
  return Math.min(score, 98); // Cap at 98%
};

const detectIntent = (input: string): string => {
  const keywords = input.toLowerCase();
  
  if (keywords.includes('create') || keywords.includes('make') || keywords.includes('build')) {
    return 'creation';
  } else if (keywords.includes('explain') || keywords.includes('describe') || keywords.includes('what')) {
    return 'explanation';
  } else if (keywords.includes('improve') || keywords.includes('optimize') || keywords.includes('enhance')) {
    return 'improvement';
  } else if (keywords.includes('analyze') || keywords.includes('compare') || keywords.includes('evaluate')) {
    return 'analysis';
  }
  
  return 'general';
};

const classifyAudience = (data: PromptData): string => {
  if (data.tone === 'technical') return 'expert';
  if (data.tone === 'formal') return 'professional';
  if (data.tone === 'casual' || data.tone === 'friendly') return 'general';
  if (data.constraints.includes('no-jargon')) return 'beginner';
  
  return 'general';
};

const analyzeStructure = (data: PromptData): string[] => {
  const structure = ['introduction', 'main_content', 'conclusion'];
  
  if (data.constraints.includes('step-by-step')) {
    structure.splice(1, 1, 'step_by_step_process');
  }
  
  if (data.constraints.includes('include-examples')) {
    structure.splice(-1, 0, 'examples');
  }
  
  return structure;
};

const listEnhancements = (data: PromptData): string[] => {
  const enhancements = [
    'Added context and objective clarification',
    'Structured with clear sections and instructions',
    'Incorporated tone and detail level preferences'
  ];
  
  if (data.constraints.length > 0) {
    enhancements.push(`Applied ${data.constraints.length} additional constraint(s)`);
  }
  
  return enhancements;
};

const generatePreviewOutput = (data: PromptData): string => {
  const examples = {
    blog: `A well-structured blog post with engaging headlines, informative content, and a clear call-to-action that would attract and retain readers while achieving the desired business objectives.`,
    code: `Clean, efficient code with proper documentation, error handling, and following best practices that would be production-ready and maintainable.`,
    image: `A detailed visual description that would generate high-quality, contextually appropriate images with proper composition, lighting, and style elements.`,
    design: `A comprehensive design solution with user-centered approach, clear visual hierarchy, and innovative elements that address user needs and business goals.`,
    summary: `A concise yet comprehensive overview that captures all key points while remaining accessible and actionable for the target audience.`,
    creative: `Engaging, original content that captures attention, evokes emotion, and delivers the intended message through compelling storytelling and creative expression.`
  };
  
  return examples[data.outputType as keyof typeof examples] || 'High-quality output that meets professional standards and user expectations.';
};