import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "../../assets/img/faces/akk.jpg";
import { TextField } from "@material-ui/core";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Profile() {
  const classes = useStyles();
  let user = JSON.parse(localStorage.getItem("user"))
  const jwt = localStorage.getItem("jwt")
  let [phone,setPhone] = useState(user.phone);
  let [email,setEmail] = useState(user.email);
  let [username,setUsername] = useState(user.username);
  let [name,setName] = useState(user.name);
  let [surname,setSurname] = useState(user.surname);
  let [password,setPassword] = useState(user.password);
  let [response,setResponse] = useState("");

  function updateAdmin(){
    fetch('http://35.189.94.121/users/'+ user.id, {
      method : 'PUT',
      headers : {'Content-Type':'application/json',Authorization: `Bearer ${jwt}`},
      body : JSON.stringify({
        phone : phone,
        email : email,
        username : username,
        name : name,
        surname : surname,
        password : password,
      }),
    })
        .then((response) => {
            return response.json();
        })
        .then((updateResponse) => {
            
        });
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="admin"
                        label="Admin username"
                        defaultValue={username}
                        name="admin"
                        onChange={e => setUsername(e.target.value)}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        defaultValue={user.phone}
                        fullWidth
                        name="phone"
                        label="Phone"
                        id="phone"
                        onChange={e => setPhone(e.target.value)}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        defaultValue={user.email}
                        fullWidth
                        name="email"
                        label="Email address"
                        id="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        defaultValue={user.name}
                        fullWidth
                        name="firstname"
                        label="First Name"
                        id="firstname"
                        onChange={e => setName(e.target.value)}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        defaultValue={user.surname}
                        fullWidth
                        name="surname"
                        label="Last Name"
                        id="surname"
                        onChange={e => setSurname(e.target.value)}
                    />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
            
              <Button onClick={()=>updateAdmin()} color="primary">Update Profile</Button>
              
            </CardFooter>
            
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
              <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>METU BikeSharing Manager</h6>
              <h4 className={classes.cardTitle}>{user.name} {user.surname}</h4>
              
            
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
