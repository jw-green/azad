from django.core.management.base import BaseCommand
from skills.models import Lift, LiftByMass, UserLift
from django.contrib.auth.models import User
import glob, os
import re
from random import randint

base_user_data = {
                  "id": 1, 
                  "user_mass": 80,
                  "user_gender": "M",
                  "user_one_rep": 0,
                 }

class Command(BaseCommand):
    help = "Load Base Data for Lifts and Lifts By Mass"

    def handle(self, *args, **options):
        os.chdir("./skills/static/lift_means/")
        mean_files = glob.glob("*")

        lift_count, lbm_count, ul_count = 0, 0, 0
        lift_loaded, lbm_loaded, ul_loaded = 0, 0, 0

        for infile in mean_files:

            # === Load Default Lifts ===
            result = re.search('(.*)_', infile)
            lift_name = result.group(1)

            result = re.search('_(.*)', infile)
            lift_gender = result.group(1)[0].upper()

            lift_obj, created = Lift.objects.get_or_create(
                name=lift_name,
                gender=lift_gender, 
            )

            lift_count += 1
            # === Output Load State ===
            if created:
                print("Lift: " + lift_name + " " + lift_gender + " Created")
                lift_loaded += 1
            else:
                print("Lift: " + lift_name + " " + lift_gender + " Already Exists")

            # === Load Lifts By Mass ===
            mean_file = open(infile, "r")
            mean_content = mean_file.readlines()

            for row in mean_content:
                row_split = row.split(",")

                lift_mass = row_split[0].lstrip()
                lift_mean = row_split[1].lstrip()
                lift_std_dev = row_split[2].lstrip()

                lbm_obj, created = LiftByMass.objects.get_or_create(
                    lift=lift_obj,
                    mass=lift_mass, 
                    mean=lift_mean, 
                    std_dev=lift_std_dev, 
                )
                
                lbm_count += 1

                # === Output Load State ===
                if created:
                    print("LiftByMass: " + lift_mass + " " + lift_name + " Created")
                    lbm_loaded += 1
                else:
                    print("LiftByMass: " + lift_mass + " " + lift_name + " Already Exists")

                if int(lift_mass) == base_user_data["user_mass"] and lift_gender == base_user_data["user_gender"]:
                    
                    user_obj = User.objects.get(id=base_user_data["id"])
                    rand_std_devs = float(lift_std_dev) * randint(-2, 2)
                    rand_one_rm = float(lift_mean) + rand_std_devs
                    base_user_data["user_one_rep"] = round(rand_one_rm, 1)

                    try:
                        _, created = UserLift.objects.get_or_create(
                            lift=lbm_obj,
                            user=user_obj, 
                            one_rep_max=base_user_data["user_one_rep"], 
                        )
                    except:
                        created = False

                    ul_count += 1

                    if created:
                        print("UserLift: " + lift_name + " " + str(base_user_data["id"]) + " Created")
                        ul_loaded += 1
                    else:
                        print("UserLift: " + lift_name + " " + str(base_user_data["id"]) + " Already Exists")

            print("------------")

        print("\nFinshed Loading: \n - Lift: ({}/{}) \n - LiftByMass: ({}/{}) \n - UserLift: ({}/{})".format(lift_loaded, 
                                                                                                        lift_count, 
                                                                                                        lbm_loaded, 
                                                                                                        lbm_count, 
                                                                                                        ul_loaded, 
                                                                                                        ul_count))