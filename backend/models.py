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
    COMPANY_CATEGORIES = [
        ('cat1', 'Category 1'),
        ('cat2', 'Category 2'),
        ('cat3', 'Category 3'),
    ]

    company_name = models.TextField(max_length=100,blank=True, null=True)
    dba = models.TextField(max_length=100,blank=True, null=True)
    group_name = models.TextField(max_length=100,blank=True, null=True)
    category = models.TextField(max_length=12, choices=COMPANY_CATEGORIES,blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    resposible = models.TextField(max_length=255,blank=True,null=True,help_text='Enter emails with , seperated')
    phone = models.TextField(max_length=15,blank=True, null=True)
    partners = models.TextField(max_length=255,blank=True,null=True,help_text='Enter emails with , seperated')
    fax = models.TextField(max_length=15,blank=True, null=True) 
    state_tax_number = models.TextField(max_length=15,blank=True, null=True)
    food_lic_number = models.TextField(max_length=15, blank=True, null=True)
    store_number = models.TextField(max_length=15, blank=True, null=True)
    ein_number = models.TextField(max_length=15, blank=True, null=True)
    manager_name = models.TextField(max_length=100, blank=True, null=True)
    address_line = models.TextField(max_length=100,blank=True, null=True)
    city = models.TextField(max_length=100, blank=True, null=True)
    country = models.TextField(max_length=100, blank=True, null=True)
    mailing_address = models.TextField(max_length=100 ,blank=True, null=True)
    owner = models.TextField(blank=True, null=True)


    database = models.ForeignKey(Database, on_delete=models.CASCADE, related_name='company_created')

    def __str__(self):
        return self.company_name
    
class Contact(models.Model):
    RATINGS = [
        ('s1', '1 star'),
        ('s2', '2 star'),
        ('s3', '3 star'),
        ('s4', '4 star'),
        ('s5', '5 star')
    ]
    firstname = models.TextField(max_length=100, blank=True, null=True)
    lastname = models.TextField(max_length=100, blank=True, null=True)
    mobile = models.TextField(max_length=15, blank=True, null=True)
    mobile2 = models.TextField(max_length=15, blank=True, null=True)
    fax = models.TextField(max_length=15, blank=True, null=True)
    email = models.EmailField()
    personal_address = models.TextField(max_length=100, blank=True, null=True)
    rating =  models.TextField(max_length=10,choices=RATINGS,blank=True,null=True)
    city = models.TextField(max_length=100, blank=True, null=True)
    state = models.TextField(max_length=100, blank=True, null=True)
    country = models.TextField(max_length=100, blank=True, null=True)
    postal_code = models.TextField(max_length=20, blank=True, null=True)
    company_address = models.TextField(max_length=100, blank=True, null=True)
    city = models.TextField(max_length=100, blank=True, null=True)
    state = models.TextField(max_length=100, blank=True, null=True)
    country = models.TextField(max_length=100, blank=True, null=True)
    postal_code = models.TextField(max_length=20, blank=True, null=True)
    company = models.ForeignKey(Company,on_delete=models.CASCADE, blank=True, null=True)
    designation = models.TextField(max_length=100, blank=True, null=True)
    work_phone = models.TextField(max_length=15, blank=True, null=True)
    category = models.TextField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    group = models.TextField(max_length=100, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    database = models.ForeignKey(Database, on_delete=models.CASCADE, related_name='contact_created')

    def __str__(self):
        return f"{self.firstname} {self.lastname}"

class Project(models.Model):
    project_name = models.TextField(max_length=255)
    project_type = models.TextField(max_length=100, blank=True, null=True)
    company = models.TextField(max_length=255, blank=True, null=True)
    contract_start_date = models.DateField(blank=True, null=True)
    contract_end_date = models.DateField(blank=True, null=True)
    contract_notice_date = models.DateField(blank=True, null=True)

    database = models.ForeignKey(Database, on_delete=models.CASCADE, related_name='project_created')

    def __str__(self):
        return self.project_name

class Property(models.Model):

    PROPERTY_TYPE = [
        ('prop1', 'GAS STATION'),
        ('prop2', 'SHOP'),
        ('prop3', 'HOUSE'),
    ]
    property_name = models.TextField(max_length=255)
    property_type = models.TextField(max_length=5, choices=PROPERTY_TYPE)
    insurance = models.DecimalField(max_digits=10, decimal_places=2)
    tenant = models.TextField(max_length=255)
    cma = models.TextField(max_length=255)
    operating = models.TextField(max_length=255,blank=True,null=True)
    investing = models.TextField(max_length=255,blank=True,null=True)
    annual_rent_increase = models.DecimalField(max_digits=5, decimal_places=2)
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
