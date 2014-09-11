(function (window, angular, Thrift, undefined) {
  'use strict';

  angular.module('ngThriftService', [])
    .service('ngThriftService', function ($q, $http) {
      return {
        create: function (Client, url, timeout) {
          var transport = new Thrift.Transport('');
          var protocol = new Thrift.Protocol(transport);
          var client = new Client(protocol);
          timeout = timeout || 30000;

          var service = {};
          var methodNames = [];
          for (var prop in client) {
            if (typeof client[prop] === 'function' && prop.substring(0, 5) !== 'send_' && prop.substring(0, 5) !== 'recv_') {
              methodNames.push(prop);
            }
          }

          angular.forEach(methodNames, function (methodName) {
            service[methodName] = function () {
              var args = Array.prototype.slice.call(arguments, 0, arguments.length);

              var thriftSend = function (data) {
                return client['send_' + methodName].apply(client, data);
              };

              var thriftRecv = function (data) {
                client.output.transport.setRecvBuffer(data);
                return client['recv_' + methodName].call(client);
              };

              var deferred = $q.defer();

              $http.post(url, args, {
                transformRequest: thriftSend,
                transformResponse: thriftRecv,
                timeout: timeout,
                tracker: methodName})
                .success(function (data) {
                  deferred.resolve(data);
                })
                .error(function (data) {
                  deferred.reject(data);
                });

              return deferred.promise;
            };
          });

          return service;
        }
      };
    });

})(window, window.angular, window.Thrift);
