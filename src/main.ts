import { App, CfnOutput, CfnParameter, Stack, StackProps } from 'aws-cdk-lib';
import { LoggingLevel, SlackChannelConfiguration } from 'aws-cdk-lib/aws-chatbot';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const topic = new Topic(this, 'StackMonitoringTopic', {
      topicName: 'stack-monitoring-topic',
    });
    new CfnOutput(this, 'TopicArnOutput', {
      value: topic.topicArn,
      exportName: 'stack-monitor-topic',
    });

    const workspaceId = new CfnParameter(this, 'Lazy::WorkspaceId');
    new CfnOutput(this, 'WorkspaceIdOutput', {
      value: workspaceId.valueAsString,
    });
    const channelId = new CfnParameter(this, 'Lazy::ChannelId');
    new CfnOutput(this, 'ChannelIdOutput', {
      value: channelId.valueAsString,
    });

    new SlackChannelConfiguration(this, 'StackMonitoringChatbot', {
      slackChannelConfigurationName: 'stack-monitoring-channel',
      slackWorkspaceId: workspaceId.valueAsString,
      slackChannelId: channelId.valueAsString,
      notificationTopics: [topic],
      logRetention: RetentionDays.ONE_DAY,
      loggingLevel: LoggingLevel.INFO,
    });

    console.log('teste1');
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'stack-monitor-dev', { env: devEnv });
// new MyStack(app, 'stack-monitor-prod', { env: prodEnv });

app.synth();