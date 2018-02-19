/*
 * TODO
 * - use parameter object
 * - handle create, update, sha transparently
 * - refactor success & error handlers
 */

var ghApiUrl = 'https://api.github.com';
function ghGet(username, password, repo, path, ref, callback) {
	$.ajax({
		dataType: "json",
		url: ghApiUrl+'/repos/'+username+'/'+repo+'/contents/'+path+'?ref='+ref,
		success: function(result){
			callback(result);
		},
		error: function(xhr,status,error){
			console.log( status, error, xhr );
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
		}
	});
}

function ghGetUser(username, password, callback) {
	$.ajax({
		dataType: "json",
		url: ghApiUrl +'/user',
		success: function(result){
			callback(result);
		},
		error: function(xhr,status,error){
			console.log( status, error, xhr );
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
		}
	});
}

function ghPut(username, password, repo, path, sha, content, name, email, message, branch, callback){
	$.ajax({
		type: "PUT",
		dataType: "json",
		url: ghApiUrl+'/repos/'+username+'/'+repo+'/contents/'+path,
		success: function(result){
			console.log( result);
		},
		error: function(xhr,status,error){
			console.log( status, error, xhr,xhr.statusCode() );
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
		},
		data: JSON.stringify({
			"message": message,
			"committer": {
				"name": name,
				"email": email
			},
			"content": btoa(content),
			branch : branch,
			sha : sha
		}),
		success: function(result){
			if(callback) callback(result);
		},
		error: function(xhr,status,error){
			console.log( status, error, xhr );
		},
	});
}