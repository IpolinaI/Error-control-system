using ECS.BLL.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ECS.BLL
{
    public static class BllServicesRegistrator
    {
        public static void AddBll(this IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IErrorService, ErrorService>();
            services.AddTransient<IHistoryService, HistoryService>();
        }
    }
}
