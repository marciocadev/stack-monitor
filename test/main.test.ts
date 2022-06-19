import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MyStack } from '../src/main';

describe('Stack monitor', () => {
  let app:App, stack:MyStack, template:Template;

  beforeAll(() => {
    app = new App();
    stack = new MyStack(app, 'test');
    template = Template.fromStack(stack);
  });

  test('Snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });

  test('Topic name', () => {
    template.hasResourceProperties('AWS::SNS::Topic', {
      TopicName: 'stack-monitoring-topic',
    });
  });
});