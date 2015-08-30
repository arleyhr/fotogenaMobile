const url = 'http://fotogena.co:3000';

var chatHist = io.connect(`${url}/HistChat`)

, notifi = io.connect(`${url}/notific`);


angular.module('fotogena', ['ionic','ngMaterial','ngCordova','luegg.directives'])

.controller('AppCtrl',['$scope','$http','$ionicPopup','$rootScope','$location','$timeout','$ionicScrollDelegate','$filter','$cordovaVibration','$state','$ionicSideMenuDelegate',($scope,$http,$ionicPopup,$rootScope,$location,$timeout,$ionicScrollDelegate,$filter,$cordovaVibration,$state,$ionicSideMenuDelegate) =>{


	$rootScope.URL = url;

	$rootScope.logged = false;

	notifi.on('notific1', a =>{

		switch(a.type){

			case 46:

				console.log('desconectado')

				console.log(a)

				var desconectado = $filter('filter')($rootScope.conectados, {us:parseInt(a.us)}, true)[0]

				var index = $rootScope.conectados.indexOf(desconectado)

				$rootScope.conectados.splice(index,1)

				$scope.$apply()

			break;

			case 47:

					console.log('conectado')


				var data = a

				console.log(a)

				var conectado = $filter('filter')($rootScope.conectados, {us: data.us })

				$rootScope.conectados.push(data)

				$scope.$apply()

			break;
		}
	});

	$rootScope.afterLogged = () => {

		$rootScope.listenMsg()

		notifi.emit("enterRoom",{session: localStorage['cookie']})

		chatHist.emit('inMobile',{
			token: localStorage['cookie']
		},
		(data) => {
			console.log(data)

        	$rootScope.conectados = data;
         		
         })

		chatHist.emit('openChat', $rootScope.auth_user.cod, (chats) => {
			$rootScope.openedChats = chats;
			console.log(chats)
			$scope.$apply();
		});

		

		$location.path('profile-me')
	}

	$scope.goToChat = (conectado) => {
		// $state.transitionTo("login")
		
		$ionicSideMenuDelegate.toggleRight()

		setTimeout(function(){
			$state.go('chat',{ nick: conectado.nick, id_user: conectado.us})
		}, 200);
	}

	$scope.login_data = {
		user:'fecace2',
		password:'123456'
	}
	
	// $rootScope.dev = true;
	$rootScope.listenMsg = () => {

		chatHist.on('chat:'+$rootScope.auth_user.nick, msg => {

			var audio = document.createElement('audio');

			audio.src = "./audios/blackhole_shot.mp3";

			audio.play();


			 $cordovaLocalNotification.add({
			 	id: '1',
			 	title: 'Fotogena!!',
          		text: msg.msg,
			 }).then(function(){

			 })

			$cordovaVibration.vibrate(1000);

			$rootScope.messages[msg.nick].push(msg)

			$rootScope.$apply();


	         	 $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
	        
		} )
	}

	if (localStorage['cookie']  && localStorage['auth_user']){

		chatHist.emit('loadDoms', 
			{
				opt: 0, 
				nick: JSON.parse(localStorage['auth_user']).nick 
			}, 
			a => {

			$rootScope.auth_user = a

			console.log($rootScope.auth_user)

			localStorage['auth_user'] = JSON.stringify(a)


			$scope.$apply();

			$rootScope.afterLogged()

		});


	}
	


}])
.controller('ChatCtrl',['$scope','$rootScope','$state','$ionicScrollDelegate','$timeout','$ionicSideMenuDelegate',($scope,$rootScope,$state,$ionicScrollDelegate,$timeout,$ionicSideMenuDelegate) => {

	$scope.nick = $state.params.nick;

	chatHist.emit('historychat', 
	{
	    user: `68458${$rootScope.auth_user.cod}`,
	    userNick: $rootScope.auth_user.nick,
	    userRep: `3546841${$state.params.id_user}`
	}, 
	messages =>{

		$rootScope.messages[$state.params.nick] = messages

		$timeout( () => {

         	 $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);

        }, 0);

  });


	$scope.sendMessage = message => {

		if (message == "" || message == null) return

		chatHist.emit('mgss', {

		    usaer: `587458125487${$state.params.id_user}`,
		  
		    me: {
			    	nick: $rootScope.auth_user.nick, 
					user: $rootScope.auth_user.cod
				},
		    mens: $scope.chat_message

		},
		msg =>{
			$rootScope.messages[$state.params.nick].push(msg)
			$scope.chat_message = '';
			$scope.$apply();

	         	 $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
			
  		})
	}
}])
.controller('LoginCtrl',['$scope','$http','$ionicPopup','$rootScope','$state',($scope,$http,$ionicPopup,$rootScope,$state) => {

	// $scope.login_data = {}
	$scope.login_data = {
		user:'fecace2',
		password:'123456'
	}

	$http.get(`${url}/getSession/`).success((data) => {
		$scope.cookie = data;
	})

	$scope.logear = () => {
		chatHist.emit('SessionStart',
			{
				vii: $scope.cookie,
			  	txt_usuario: $scope.login_data.user,
			  	txt_password: $scope.login_data.password,
			}, 

			a  => {


				if(angular.equals(a.val,1) || angular.equals(a.val,2))

					$ionicPopup.alert({
					    title: 'Usuario o Contraseña Incorrectos',
					    subTitle: 'Usuario o Contraseña Incorrectos .l.'
					  })

				else if(angular.equals(a.val,3)){

					$rootScope.auth_user = a

					localStorage['auth_user'] = JSON.stringify(a);

					localStorage['cookie'] = `node=${a.cook}--`;

					$rootScope.afterLogged();


			  // $timeout(function() {
			  //    myPopup.close(); //close the popup after 3 seconds for some reason
			  // }, 3000);
			}
    	}
		)
	}

}])
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})

// fitlers
.filter('nl2br', ['$filter',
  function($filter) {
    return function(data) {
      if (!data) return data;
      return data.replace(/\n\r?/g, '<br />');
    };
  }
])

// .controller('LoginCtrl', ($scope, $ionicPopup, $state) => {
	
// })
.constant('CONFIG', {

	"APIURL": "/api/v1/",

})
.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
    .state('login', {
      url: '/login',
      templateUrl: './templates/login.html',
      controller: 'LoginCtrl'
    })
    
    .state('signup', {
      url: '/signup',
      templateUrl: './templates/signup.html'
    })
    
    .state('profile-me', {
      url: '/profile-me',
      templateUrl: './templates/profile-me.html'
    })

    .state('chat',{
    	url: '/chat/:nick/:id_user',
    	templateUrl:'./templates/chat/layout.html',
    	controller:'ChatCtrl'
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/login');
  

})
.run(($ionicPlatform, $rootScope, $http,$state) => {

	$rootScope.messages = [];

	$rootScope.$on('$stateChangeStart', 
	
	(event, toState, toParams, fromState, fromParams) => {
		let state = toState.name
		// if (!localStorage['token'] && toState.authRequired){
		// 	$state.transitionTo("login");
  //       	event.preventDefault(); 
		// };
		// if (localStorage['token'] && !toState.authRequired){
  //       	event.preventDefault(); 
		// };
	});

	$ionicPlatform.ready(() => {
		if(window.cordova && window.cordova.plugins.Keyboard)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		
		if(window.StatusBar)
			StatusBar.styleDefault();
		
	});

})
