using ECS.BLL;
using ECS.DAL.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ECS.DAL
{
    public static class DalServicesRegistrator
    {
        public static void AddDal(this IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IErrorRepository, ErrorRepository>();
            services.AddTransient<IHistoryRepository, HistoryRepository>();
        }
    }
}
