import { ChatOpenAI } from '@langchain/openai';
import { BaseMessage } from '@langchain/core/messages';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import 'dotenv/config';
import { LLM } from '@/core/interfaces/llm.interface';

export class OpenAI4o implements LLM {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY!,
      // @ts-expect-error 123
      baseUrl: process.env.OPENAI_BASE_URL,
    });
  }

  async invokeAndParse<T extends Record<string, any>>(
    messages: BaseMessage[],
    parser: JsonOutputParser<T>,
  ): Promise<T> {
    const response = await this.model.invoke(messages);

    return parser.invoke(response);
  }
}
