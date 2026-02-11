namespace Codebros.Application.Common.Interfaces;

public interface IMessageBus
{
    void Publish(string queueName, object message);
}
