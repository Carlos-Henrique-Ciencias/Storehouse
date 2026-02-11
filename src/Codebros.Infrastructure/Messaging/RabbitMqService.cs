using System.Text;
using System.Text.Json;
using Codebros.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;

namespace Codebros.Infrastructure.Messaging;

public class RabbitMqService : IMessageBus
{
    private readonly string _hostname;
    private readonly string _username;
    private readonly string _password;

    public RabbitMqService(IConfiguration configuration)
    {
        _hostname = "localhost"; // Como está no Docker com porta exposta
        _username = "booking";
        _password = "booking123";
    }

    public void Publish(string queueName, object message)
    {
        var factory = new ConnectionFactory() { HostName = _hostname, UserName = _username, Password = _password };
        using var connection = factory.CreateConnection();
        using var channel = connection.CreateModel();

        channel.QueueDeclare(queue: queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

        var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));

        channel.BasicPublish(exchange: "", routingKey: queueName, basicProperties: null, body: body);
    }
}
