from rest_framework import serializers
from .models import Database, Contact, Company, Project, Property, User

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"

class DatabaseSerializer(serializers.ModelSerializer):
    contact_created = ContactSerializer(many=True, read_only=True)
    company_created = CompanySerializer(many=True, read_only=True)
    project_created = ProjectSerializer(many=True, read_only=True)
    property_created = PropertySerializer(many=True, read_only=True)

    class Meta:
        model = Database
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']