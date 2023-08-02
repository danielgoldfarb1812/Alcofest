class User{
    //תכונות
    User_name
    User_password
    User_FirstName
    User_LastName
    User_email
    User_Date
    User_City
    User_Street
    User_StreetNumber

    //בנאי
    constructor(  User_name,User_password,User_FirstName,User_LastName,User_email,User_Date,User_City,User_Street,User_StreetNumber){
        this.User_name=User_name;
        this.User_password=User_password;
        this.User_FirstName=User_FirstName;
        this.User_LastName=User_LastName;
        this.User_email=User_email;
        this.User_Date=User_Date;
        this.User_City=User_City;
        this.User_Street=User_Street;
        this.User_StreetNumber=User_StreetNumber;
    }

    getFullName() {
        return `${this.User_FirstName}  ${this.User_LastName}`
    }

    getBirthdate() {
        let year =parseInt(User_Date.split(`-`))
        return `${year[0]}/${year[1]}/${year[2]}`
    }

    updateDetails(User_name,User_password,User_FirstName,User_LastName,User_email,User_Date,User_City,User_Street,User_StreetNumber){
        this.User_name=User_name;
        this.User_password=User_password;
        this.User_FirstName=User_FirstName;
        this.User_LastName=User_LastName;
        this.User_email=User_email;
        this.User_Date=User_Date;
        this.User_City=User_City;
        this.User_Street=User_Street;
        this.User_StreetNumber=User_StreetNumber;
    }
}