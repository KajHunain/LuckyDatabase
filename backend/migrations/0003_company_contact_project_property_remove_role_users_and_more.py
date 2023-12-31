# Generated by Django 4.2.1 on 2023-06-19 18:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_relation'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.TextField(blank=True, max_length=100, null=True)),
                ('dba', models.TextField(blank=True, max_length=100, null=True)),
                ('group_name', models.TextField(blank=True, max_length=100, null=True)),
                ('category', models.TextField(blank=True, choices=[('cat1', 'Category 1'), ('cat2', 'Category 2'), ('cat3', 'Category 3')], max_length=12, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('resposible', models.TextField(blank=True, help_text='Enter emails with , seperated', max_length=255, null=True)),
                ('phone', models.TextField(blank=True, max_length=15, null=True)),
                ('partners', models.TextField(blank=True, help_text='Enter emails with , seperated', max_length=255, null=True)),
                ('fax', models.TextField(blank=True, max_length=15, null=True)),
                ('state_tax_number', models.TextField(blank=True, max_length=15, null=True)),
                ('food_lic_number', models.TextField(blank=True, max_length=15, null=True)),
                ('store_number', models.TextField(blank=True, max_length=15, null=True)),
                ('ein_number', models.TextField(blank=True, max_length=15, null=True)),
                ('manager_name', models.TextField(blank=True, max_length=100, null=True)),
                ('address_line', models.TextField(blank=True, max_length=100, null=True)),
                ('city', models.TextField(blank=True, max_length=100, null=True)),
                ('country', models.TextField(blank=True, max_length=100, null=True)),
                ('mailing_address', models.TextField(blank=True, max_length=100, null=True)),
                ('owner', models.TextField(blank=True, null=True)),
                ('database', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='company_created', to='backend.database')),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.TextField(blank=True, max_length=100, null=True)),
                ('lastname', models.TextField(blank=True, max_length=100, null=True)),
                ('mobile', models.TextField(blank=True, max_length=15, null=True)),
                ('mobile2', models.TextField(blank=True, max_length=15, null=True)),
                ('fax', models.TextField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('personal_address', models.TextField(blank=True, max_length=100, null=True)),
                ('rating', models.TextField(blank=True, choices=[('s1', '1 star'), ('s2', '2 star'), ('s3', '3 star'), ('s4', '4 star'), ('s5', '5 star')], max_length=10, null=True)),
                ('company_address', models.TextField(blank=True, max_length=100, null=True)),
                ('city', models.TextField(blank=True, max_length=100, null=True)),
                ('state', models.TextField(blank=True, max_length=100, null=True)),
                ('country', models.TextField(blank=True, max_length=100, null=True)),
                ('postal_code', models.TextField(blank=True, max_length=20, null=True)),
                ('designation', models.TextField(blank=True, max_length=100, null=True)),
                ('work_phone', models.TextField(blank=True, max_length=15, null=True)),
                ('category', models.TextField(blank=True, max_length=100, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('group', models.TextField(blank=True, max_length=100, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.company')),
                ('database', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contact_created', to='backend.database')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.TextField(max_length=255)),
                ('project_type', models.TextField(max_length=100)),
                ('company', models.TextField(max_length=255)),
                ('contract_start_date', models.DateField()),
                ('contract_end_date', models.DateField()),
                ('contract_notice_date', models.DateField()),
                ('database', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_created', to='backend.database')),
            ],
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('property_name', models.TextField(max_length=255)),
                ('property_type', models.TextField(choices=[('prop1', 'GAS STATION'), ('prop2', 'SHOP'), ('prop3', 'HOUSE')], max_length=5)),
                ('insurance', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tenant', models.TextField(max_length=255)),
                ('cma', models.TextField(max_length=255)),
                ('operating', models.TextField(blank=True, max_length=255, null=True)),
                ('investing', models.TextField(blank=True, max_length=255, null=True)),
                ('annual_rent_increase', models.DecimalField(decimal_places=2, max_digits=5)),
                ('lease_start_date', models.DateField(blank=True, null=True)),
                ('lease_end_date', models.DateField(blank=True, null=True)),
                ('lease_notice_date', models.DateField(blank=True, null=True)),
                ('coam_agreement_start_date', models.DateField(blank=True, null=True)),
                ('coam_agreement_end_date', models.DateField(blank=True, null=True)),
                ('coam_agreement_notice_date', models.DateField(blank=True, null=True)),
                ('insurance_start_date', models.DateField(blank=True, null=True)),
                ('insurance_end_date', models.DateField(blank=True, null=True)),
                ('insurance_notice_date', models.DateField(blank=True, null=True)),
                ('database', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='property_created', to='backend.database')),
            ],
        ),
        migrations.RemoveField(
            model_name='role',
            name='users',
        ),
        migrations.RemoveField(
            model_name='table',
            name='database',
        ),
        migrations.DeleteModel(
            name='Relation',
        ),
        migrations.DeleteModel(
            name='Role',
        ),
        migrations.DeleteModel(
            name='Table',
        ),
    ]
