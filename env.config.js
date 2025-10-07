// env.config.js - Plugin Configuration for Open edX MFEs

import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import ChatbotPlugin from './src/ChatbotPlugin';

const config = {
  pluginSlots: {
    // This plugin can be inserted into the footer slot of any MFE
    'footer_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'openedx_chatbot',
            type: DIRECT_PLUGIN,
            priority: 50,
            RenderWidget: ChatbotPlugin,
          },
        },
      ],
    },
    // Alternative: Insert into course unit slot for learning MFE
    'course_unit_content_slot': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'openedx_chatbot',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: ChatbotPlugin,
          },
        },
      ],
    },
  },
};

export default config;
