from django.db import models
from django.contrib.auth.models import User

class Database(models.Model):
    database_title = models.CharField(max_length=200)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='database_created')

    editors = models.ManyToManyField(User, related_name='edited_projects',blank=True)

    viewers = models.ManyToManyField(User, related_name='viewed_projects',blank=True)

    def __str__(self):
    	return self.database_title 
    
class Company(models.Model):

    company_name = models.TextField(max_length=100)
    dba = models.TextField(blank=True, null=True)
    group_name = models.TextField(blank=True, null=True)
    category = models.TextField( blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    resposible = models.TextField(blank=True,null=True)
    phone = models.TextField(blank=True, null=True)
    partners = models.TextField(blank=True,null=True)
    fax = models.TextField(blank=True, null=True) 
    state_tax_number = models.TextField(blank=True, null=True)
    food_lic_number = models.TextField( blank=True, null=True)
    store_number = models.TextField(blank=True, null=True)
    ein_number = models.TextField(blank=True, null=True)
    manager_name = models.TextField(blank=True, null=True)
    address_line = models.TextField(blank=True, null=True)
    city = models.TextField( blank=True, null=True)
    country = models.TextField(blank=True, null=True)
    mailing_address = models.TextField(blank=True, null=True)
    owner = models.TextField(blank=True, null=True)


    database = models.ForeignKey(Database, on_delete=models.CASCADE, related_name='company_created')

    def __str__(self):
        return self.company_name
    
class Contact(models.Model):
 
    firstname = models.TextField()
    lastname = models.TextField(blank=True, null=True)
    mobile = models.TextField(blank=True, null=True)
    mobile2 = models.TextField( blank=True, null=True)
    fax = models.TextField( blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    personal_address = models.TextField( blank=True, null=True)
    rating =  models.TextField(blank=True,null=True)
    city = models.TextField(blank=True, null=True)
    state = models.TextField( blank=True, null=True)
    country = models.TextField(blank=True, null=True)
    postal_code = models.TextField(blank=True, null=True)
    company_address = models.TextField(blank=True, null=True)
    city = models.TextField( blank=True, null=True)
    state = models.TextField( blank=True, null=True)
    country = models.TextField(blank=True, null=True)
    postal_code = models.TextField(blank=True, null=True)
    company = models.TextField(blank=True, null=True)
    designation = models.TextField( blank=True, null=True)
    work_phone = models.TextField( blank=True, null=True)
    category = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    group = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    database = models.ForeignKey(Database, on_delete=models.CASCADE, related_name='contact_created')

    def __str__(self):
        return f"{self.firstname} {self.lastname}"

class Project(models.Model):
    project_name = models.TextField(max_length=255)
    project_type = models.TextField(blank=True, null=True)
    company = models.TextField(blank=True, null=True)
    contract_start_date = models.DateField(blank=True, null=True)
    contract_end_date = models.DateField(blank=True, null=True)
    contract_notice_date = models.DateField(blank=True, null=True)

    database = models.ForeignKey(Database, on_delete=models.CASCADE, related_name='project_created')

    def __str__(self):
        return self.project_name

class Property(models.Model):


    property_name = models.TextField(max_length=255)
    property_type = models.TextField(blank=True,null=True)
    insurance = models.TextField(blank=True,null=True)
    tenant = models.TextField(blank=True,null=True)
    cma = models.TextField(blank=True,null=True)
    operating = models.TextField(blank=True,null=True)
    investing = models.TextField(blank=True,null=True)
    annual_rent_increase = models.TextField(blank=True,null=True)
    lease_start_date = models.DateField(blank=True, null=True)
    lease_end_date = models.DateField(blank=True, null=True)
    lease_notice_date = models.DateField(blank=True, null=True)
    coam_agreement_start_date = models.DateField(blank=True, null=True)
    coam_agreement_end_date = models.DateField(blank=True, null=True)
    coam_agreement_notice_date = models.DateField(blank=True, null=True)
    insurance_start_date = models.DateField(blank=True, null=True)
    insurance_end_date = models.DateField(blank=True, null=True)
    insurance_notice_date = models.DateField(blank=True, null=True)

    database = models.ForeignKey(Database, on_delete=models.CASCADE, related_name='property_created')


    def __str__(self):
        return self.property_name
