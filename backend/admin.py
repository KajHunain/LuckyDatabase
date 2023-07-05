from django.contrib import admin

from .models import Database, Contact, Company, Project, Property


admin.site.register([Database, Contact, Company, Project, Property])