import { RunTestCase } from '@/app/usecases/run-test-case';

export interface TestRunnerOptions {
  accessUrl: string;
  prompt: string;
}

export interface TestRunnerResult {
  status: 'passed' | 'failed';
  output: string;
}

/**
 * 运行单个测试用例
 * @param options - 测试配置
 * @param options.accessUrl - 要测试的网站 URL
 * @param options.prompt - 测试内容描述（用户故事格式）
 * @returns 测试结果，包含 status（passed/failed）和 output（原因说明）
 *
 * @example
 * ```ts
 * const result = await runTest({
 *   accessUrl: 'https://www.amazon.com',
 *   prompt: 'Given I am on the amazon website\nWhen I navigate to the Sign In page\nThen I should see the sign in page'
 * });
 *
 * console.log(result.status); // 'passed' 或 'failed'
 * console.log(result.output); // 成功或失败的原因说明
 * ```
 */
export async function runTest(
  options: TestRunnerOptions,
): Promise<TestRunnerResult> {
  const runTestCase = new RunTestCase();

  const result = await runTestCase.execute(options.accessUrl, options.prompt);

  return {
    status: result.status,
    output: result.reason,
  };
}
