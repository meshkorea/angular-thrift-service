ngThriftService
======================
An AngularJS module for consuming Thrift APIs by generating corresponding AngualrJS services.

### Installation

```bash
$ bower install angular-thrift-service --save
```


### Example
#### account.thrift 
``` 
namespace js HelloWorld

typedef string AccessToken

service AccountService {
    AccessToken authenticate(1: string username, 2: string password)
}

```

#### app.js
```js
/* globals HelloWorld */
angular
    .module('app', ['ngThriftService'])
    .constant('Account', HelloWorld.Account)
```


#### services.js
```js
angular
    .module('app')
    .service('accountService', function(Account, ngThriftService) {
        var url = 'http://helloworld.com/api/account'; // the api endpoint url
        var timeout = 30000; // 30000 ms
        return ngThriftService.create(Account.AccountServiceClient, url, timeout);
    });
```


#### login.controller.js
```js
angular
    .module('app')
    .controller('LoginController', funciton($scope, Account, accountService) {
        $scope.username = '';
        $scope.password = '';
        $scope.login = function() {
            accountService
                .authenticate($scope.username, $scope.password)
                .then(function(token) {
                    console.log('Successfully logged in');
                })
                .catch(function(e) {
                    console.log('Invalid username/password');
                });
        };
    });
```
