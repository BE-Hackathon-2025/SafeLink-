# ML Models

## Placeholder for TensorFlow Lite Models

### Expected Models:
- `routing-model.tflite` - AI-powered message routing
- `priority-classifier.tflite` - Message urgency classification  
- `translator-model.tflite` - Multi-language support

### Current Status:
Using heuristic/rule-based implementations as placeholders.

### To integrate TFLite models:
1. Train models using TensorFlow
2. Convert to TensorFlow Lite format
3. Place `.tflite` files in this directory
4. Update RouterAI.js and PriorityClassifier.js to load models

