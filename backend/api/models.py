from django.db import models

# Create your models here.
class Customer(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    age = models.IntegerField()
    salary = models.IntegerField()
    
    male = 'male'
    female = 'female'

    customer_genders = [
        (male, 'male'),
        (female, 'female'),
    ]

    gender = models.CharField(max_length=50, choices=customer_genders)

    def __str__(self):
        return self.firstName