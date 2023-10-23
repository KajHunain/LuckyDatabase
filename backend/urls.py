
from rest_framework import routers
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views 

# router = routers.DefaultRouter()
# router.register(r'db', views.IndexDatabase , basename='db')
# router.register(r'(?P<id>\d+)/contact', views.ContactView ,basename='contact')


urlpatterns = [
    path('',views.Index, name='index'),
    path('<int:id>/contact',views.contact, name='contactview'),
    path('<int:id>/company',views.company, name='companyview'),
    path('<int:id>/property',views.property, name='propertyview'),
    path('<int:id>/project',views.project, name ='projectview'),
    path('signin',views.signin, name='signin'),
    path('register',views.register, name='register'),
    path('createdb',views.createDb, name='createdb'),
    path('base',views.baseview, name='base'),
    path('database/<int:id>',views.databaseView, name='database'),
    path('contact/<int:id>',views.contactView, name='contact'),
    path('company/<int:id>',views.companyView, name='company'),
    path('project/<int:id>',views.projectView, name='project'),

    # path('api/', include(router.urls)),
    path('api/index/', views.IndexViewApi.as_view(), name='apiindex'),

    path('api/<int:db>/contact/', views.ContactListApi.as_view(), name='contactlistapi'),
    path('api/<int:db>/contactcreate/', views.ContactCreateApi.as_view(), name='contactcreateapi'),
    path('api/<int:db>/contactdelete/<int:pk>/', views.ContactDeleteApi.as_view(), name='contactdelete'),
    path('api/<int:db>/contactupdate/<int:pk>/', views.ContactUpdateApi.as_view(), name='contactupdate'),

    path('api/<int:db>/company/', views.CompanyListApi.as_view(), name='companylistapi'),
    path('api/<int:db>/companycreate/', views.CompanyCreateApi.as_view(), name='companycreateapi'),
    path('api/<int:db>/companydelete/<int:pk>/', views.CompanyDeleteApi.as_view(), name='companydelete'),
    path('api/<int:db>/companyupdate/<int:pk>/', views.CompanyUpdateApi.as_view(), name='companyupdate'),

    path('api/<int:db>/property/', views.PropertyListApi.as_view(), name='propertylistapi'),
    path('api/<int:db>/propertycreate/', views.PropertyCreateApi.as_view(), name='propertycreateapi'),
    path('api/<int:db>/propertydelete/<int:pk>/', views.PropertyDeleteApi.as_view(), name='propertydelete'),
    path('api/<int:db>/propertyupdate/<int:pk>/', views.PropertyUpdateApi.as_view(), name='propertyupdate'),

    path('api/<int:db>/project/', views.ProjectListApi.as_view(), name='projectlistapi'),
    path('api/<int:db>/projectcreate/', views.ProjectCreateApi.as_view(), name='projectcreateapi'),
    path('api/<int:db>/projectdelete/<int:pk>/', views.ProjectDeleteApi.as_view(), name='projectdelete'),
    path('api/<int:db>/projectupdate/<int:pk>/', views.ProjectUpdateApi.as_view(), name='projectupdate'),

    path('api/createdb/', views.DatabaseCreateView.as_view(), name='apicreatedb'),
    path('api/<int:pk>/databasedelete/', views.DatabaseDeleteApi.as_view(), name='databasedelete'),
    # path('api/<int:db>/databaseupdate/', views.DatabaseUpdateApi.as_view(), name='databaseupdate'),

    path('api/createuser/', views.CreateUserView.as_view(), name='apicreateuser'),
    
    path('api/signin/', views.SigninView.as_view(), name='apisignin'),
    path('api/signout/', views.SignoutView.as_view(), name='apisignout'),
    
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
