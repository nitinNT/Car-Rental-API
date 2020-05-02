# Car-Rental-API
Car Rental Company has many cars of the same model type and the user can book the car of a particular model depending on availability of that car model. Authentication is required to update, delete and add the cars in the database.

**How to Run**<br/>
1. Clone the repo
2. Goto that directory
3. run command npm install
4. run command npm run start 

**Creating the user:**<br/>
![image](https://user-images.githubusercontent.com/40491064/80866934-0fc5ad00-8caf-11ea-9efd-9e9b798f3a1b.png)

**Add the new car:**<br/>
Step1) Login to get token<br/>
![image](https://user-images.githubusercontent.com/40491064/80867233-bc545e80-8cb0-11ea-8697-7fa45847364d.png)

The token is put into the Authorization header to serve the update request.
Step2) Add the car<br/>
![image](https://user-images.githubusercontent.com/40491064/80867243-dbeb8700-8cb0-11ea-8489-fa6f9c8e47dd.png)

**Issue the particular car to the user:**<br/>
![image](https://user-images.githubusercontent.com/40491064/80867270-063d4480-8cb1-11ea-8a6b-85ee62919277.png)
 
**Number of Bookings of the car is updated and stock is updated when the issue is submitted:**<br/>
![image](https://user-images.githubusercontent.com/40491064/80867283-16edba80-8cb1-11ea-8ea6-c8a83c3df3da.png)
 
**The return status of the issue is changed when the id put in URL and returned date is today’s date:**<br/>
![image](https://user-images.githubusercontent.com/40491064/80867309-34bb1f80-8cb1-11ea-9734-636737df441d.png)

**Number of Bookings of the car is updated and stock is updated when the car is returned:**<br/>
![image](https://user-images.githubusercontent.com/40491064/80867324-469cc280-8cb1-11ea-9ce3-54a3dec80b83.png)

**GET the Car Rentals history for user:**<br/>
![image](https://user-images.githubusercontent.com/40491064/80867331-51575780-8cb1-11ea-9468-8e66c6eff21c.png)

**GET all car rentals history:**<br/>
![image](https://user-images.githubusercontent.com/40491064/80867347-6338fa80-8cb1-11ea-9cd1-52ad6c2ed80d.png)

**GET particular car rental history by its id:**<br/>
![image](https://user-images.githubusercontent.com/40491064/80867352-68964500-8cb1-11ea-9ba2-7d9e9ae630d8.png)
 
**Update the car details when the bookings are not there:**<br/>
The token is put into the Authorization header to serve this request.<br/>
![image](https://user-images.githubusercontent.com/40491064/80867384-71871680-8cb1-11ea-96c0-6db1e3408aa4.png)

**Delete the card details when the bookings are not there:**<br/>
The token is put into the Authorization header to serve the delete request.<br/>
![image](https://user-images.githubusercontent.com/40491064/80867419-7f3c9c00-8cb1-11ea-88ee-aec3ec2f10b6.png)

**GET all User details:**<br/>
![image](https://user-images.githubusercontent.com/40491064/80867424-85cb1380-8cb1-11ea-9ab6-70523c55199b.png)
