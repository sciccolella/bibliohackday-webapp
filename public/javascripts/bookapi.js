var BookAPI = {
    url: "http://18.222.10.130:5000/api/v1/",
    welcome: function () {
        return new Promise(function (resolve, reject) {   
            var xhr = new XMLHttpRequest();
            xhr.open("GET", BookAPI.url);

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    },
    signup: function(name, surname, email, password) {

        return new Promise((resolve, reject) => {
            
            if (name === undefined || surname === undefined || email === undefined || password === undefined) {
                reject({
                    status: this.status,
                    connectionError: false,
                    body: '{"message": "Please fill all the required information."}'
                });
            }

            var xhr = new XMLHttpRequest();
            var data = `name=${name}&surname=${surname}&email=${email}&password=${password}`;
            xhr.open("POST", `${BookAPI.url}users`);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        connectionError: false,
                        body: xhr.responseText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    connectionError: true
                });
            };
            xhr.send(data);
        });
    },
    login : function(email, password) {
        return new Promise(function(resolve, reject) {

            if (email === undefined || password === undefined) {
                reject({
                    connectionError: false,
                    body: '{"message": "Please fill all the required information."}'
                });
            }

            var xhr = new XMLHttpRequest();
            var data = `email=${email}&password=${password}`;
            xhr.open("POST", `${BookAPI.url}login`);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        body: xhr.responseText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    body: xhr.responseText
                });
            };
            xhr.send(data);

        });
    },
    getUserInfo : function(authToken) {
        return new Promise(function(resolve, reject) {
            if (authToken === undefined) {
                reject({
                    connectionError: false,
                    body: '{"message": "User authentication failed."}'
                });
            }

            var xhr = new XMLHttpRequest();
            xhr.open("GET", `${BookAPI.url}users`);
            xhr.setRequestHeader("token", authToken);

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        body: xhr.responseText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    body: xhr.responseText
                });
            };
            xhr.send();

        });
    },
    addBook : function(authToken, title, author, pages_number, description, available, shelf_id) {
        return new Promise(function(resolve, reject) {
            if (authToken === undefined || title === undefined || author === undefined || 
                pages_number === undefined || description === undefined || 
                available === undefined || shelf_id === undefined) {
                reject({
                    status: this.status,
                    connectionError: false,
                    body: '{"message": "Please fill all the required information."}'
                });
            }
    
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `${BookAPI.url}books`);
            xhr.setRequestHeader("token", authToken);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            var data = `title=${title}&author=${author}&pages_number=${pages_number}&description=${description}&available=${available}&shelf_id=${shelf_id}`;
    
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        body: xhr.responseText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    body: xhr.responseText
                });
            };
            xhr.send(data);
    
        });
    },
    getAvailableBooks : function (authToken, shelf_id) {
        return new Promise(function(resolve, reject) {
            if (authToken === undefined || shelf_id === undefined) {
                reject({
                    status: this.status,
                    connectionError: false,
                    body: '{"message": "Please fill all the required information."}'
                });
            }
    
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `${BookAPI.url}shelves/${shelf_id}`);
            xhr.setRequestHeader("token", authToken);
    
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        body: xhr.responseText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    body: xhr.responseText
                });
            };
            xhr.send();
        });
    },
    getBook : function (authToken, book_id) {
        return new Promise(function(resolve, reject) {
            if (authToken === undefined || book_id === undefined) {
                reject({
                    status: this.status,
                    connectionError: false,
                    body: '{"message": "Please fill all the required information."}'
                });
            }
    
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `${BookAPI.url}books/${book_id}`);
            xhr.setRequestHeader("token", authToken);
    
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        body: xhr.responseText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    body: xhr.responseText
                });
            };
            xhr.send();
        });
    },
    addReservation : function (authToken, shelf_id, book_id, type) {
        return new Promise(function(resolve, reject) {
            if (authToken === undefined || shelf_id === undefined || 
                book_id === undefined || type === undefined || 
                !(type === 'pick' || type === 'leave')) {
                reject({
                    status: this.status,
                    connectionError: false,
                    body: '{"message": "Please fill all the required information."}'
                });
            }
    
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `${BookAPI.url}reservations/`);
            xhr.setRequestHeader("token", authToken);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            var data = `shelf_id=${shelf_id}&book_id=${book_id}&type=${type}`;
    
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        body: xhr.responseText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    body: xhr.responseText
                });
            };
            xhr.send(data);
    
        });
    },
    getReservationInfo : function (authToken, reservationID) {
        return new Promise(function(resolve, reject) {
            if (authToken === undefined || reservationID === undefined) {
                reject({
                    status: this.status,
                    connectionError: false,
                    body: '{"message": "Please fill all the required information."}'
                });
            }
    
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `${BookAPI.url}reservations/${reservationID}`);
            xhr.setRequestHeader("token", authToken);
    
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        body: xhr.responseText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    body: xhr.responseText
                });
            };
            xhr.send();
    
        });
    },
    getUserReservations : function (authToken) {
        return new Promise(function(resolve, reject) {
            if (authToken === undefined) {
                reject({
                    status: this.status,
                    connectionError: false,
                    body: '{"message": "Please fill all the required information."}'
                });
            }
    
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `${BookAPI.url}reservations/`);
            xhr.setRequestHeader("token", authToken);
    
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        body: xhr.responseText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    body: xhr.responseText
                });
            };
            xhr.send();
        });
    }
}