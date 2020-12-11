## Test the Azure Function

Our function is ready to test– but before that, we have to install all the necessary package dependencies. Remember the `parse-multipart`  and `node-fetch`  packages that we used? We actually have to manually install these in the console using npm install.



Navigate to your Function App. **This is not the function code, but the actual app service resource**. 



In the left tab, scroll down to **Console**.


![console](images/console.png)



Enter these commands in order:

The first creates a **package.json** file to store your dependencies. The next two actually install the necessary packages.

```
npm init -y 

npm install parse-multipart

npm install node-fetch
```

You should be good to go! Reach out to your TA's if there are any issues!
