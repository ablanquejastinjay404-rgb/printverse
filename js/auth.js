function Auth() {
    this.usersKey = 'printverse_users';
    this.sessionKey = 'printverse_session';
    this.tempDataKey = 'printverse_temp';
}

Auth.prototype.getUsers = function() {
    try { 
        var data = localStorage.getItem(this.usersKey);
        return data ? JSON.parse(data) : {}; 
    }
    catch (e) { 
        console.error('Error parsing users:', e);
        return {}; 
    }
};

Auth.prototype.saveUsers = function(users) {
    try { 
        localStorage.setItem(this.usersKey, JSON.stringify(users)); 
        return true;
    }
    catch (e) { 
        console.error('Error saving users:', e);
        return false;
    }
};

Auth.prototype.validateEmail = function(email) {
    var trimmed = email.trim().toLowerCase();
    if (!trimmed || trimmed.length < 5) return { valid: false, error: 'Please enter a valid email' };
    if (trimmed.indexOf('@gmail.com') === -1) return { valid: false, error: 'Please use a @gmail.com email address' };
    return { valid: true, email: trimmed };
};

Auth.prototype.validatePassword = function(password) {
    if (!password || password.length < 4) return { valid: false, error: 'Password must be at least 4 characters' };
    return { valid: true };
};

Auth.prototype.signup = function(email, password, firstName, middleName, lastName) {
    var emailValidation = this.validateEmail(email);
    if (!emailValidation.valid) return { success: false, error: emailValidation.error };
    
    var users = this.getUsers();
    var key = emailValidation.email;
    
    if (users[key]) return { success: false, error: 'Account already exists with this email' };
    
    var pwValidation = this.validatePassword(password);
    if (!pwValidation.valid) return { success: false, error: pwValidation.error };
    
    var first = (firstName || '').trim();
    if (!first) return { success: false, error: 'Please enter your first name' };
    
    var mid = (middleName || '').trim();
    var last = (lastName || '').trim();
    
    users[key] = { 
        password: password, 
        firstName: first, 
        middleName: mid, 
        lastName: last, 
        pinned: [],
        createdAt: new Date().toISOString()
    };
    
    if (!this.saveUsers(users)) {
        return { success: false, error: 'Failed to save account. Please try again.' };
    }
    
    this.setSession(key);
    return { success: true };
};

Auth.prototype.login = function(email, password) {
    var emailValidation = this.validateEmail(email);
    if (!emailValidation.valid) return { success: false, error: emailValidation.error };
    
    var users = this.getUsers();
    var key = emailValidation.email;
    
    if (!users[key]) {
        return { success: false, error: 'No account found with this email' };
    }
    
    if (users[key].password !== password) {
        return { success: false, error: 'Incorrect password' };
    }
    
    this.setSession(key);
    return { success: true };
};

Auth.prototype.setSession = function(username) {
    try { 
        localStorage.setItem(this.sessionKey, JSON.stringify({ 
            username: username,
            loginTime: new Date().toISOString()
        })); 
        return true;
    }
    catch (e) { 
        console.error('Error saving session:', e);
        return false;
    }
};

Auth.prototype.logout = function() {
    try { 
        localStorage.removeItem(this.sessionKey);
        return true;
    } 
    catch (e) { 
        console.error('Error logging out:', e);
        return false;
    }
};

Auth.prototype.getCurrentUser = function() {
    try {
        var session = localStorage.getItem(this.sessionKey);
        if (!session) return null;
        var parsed = JSON.parse(session);
        return parsed ? parsed.username : null;
    } 
    catch (e) { 
        console.error('Error getting current user:', e);
        return null; 
    }
};

Auth.prototype.isLoggedIn = function() {
    var user = this.getCurrentUser();
    if (!user) return false;
    // Verify user still exists in database
    var users = this.getUsers();
    return users[user] ? true : false;
};

Auth.prototype.getUserPinned = function() {
    var username = this.getCurrentUser();
    if (!username) return [];
    var users = this.getUsers();
    return (users[username] && users[username].pinned) ? users[username].pinned : [];
};

Auth.prototype.saveUserPinned = function(pinnedData) {
    var username = this.getCurrentUser();
    if (!username) {
        console.error('No user logged in for pinned save');
        return false;
    }
    var users = this.getUsers();
    if (!users[username]) {
        console.error('User not found for pinned save');
        return false;
    }
    users[username].pinned = pinnedData || [];
    return this.saveUsers(users);
};

Auth.prototype.getUserFullName = function() {
    var username = this.getCurrentUser();
    if (!username) return 'Guest';
    var users = this.getUsers();
    if (!users[username]) return 'Guest';
    var u = users[username];
    var parts = [u.firstName || '', u.middleName || '', u.lastName || ''];
    var fullName = parts.filter(function(s) { return s; }).join(' ').trim();
    return fullName || username;
};

Auth.prototype.getUserFirstName = function() {
    var username = this.getCurrentUser();
    if (!username) return 'Guest';
    var users = this.getUsers();
    if (!users[username]) return 'Guest';
    return users[username].firstName || username;
};

Auth.prototype.getUserData = function() {
    var username = this.getCurrentUser();
    if (!username) return null;
    var users = this.getUsers();
    return users[username] || null;
};

Auth.prototype.updateProfile = function(firstName, middleName, lastName) {
    var username = this.getCurrentUser();
    if (!username) return { success: false, error: 'Not logged in' };
    
    var users = this.getUsers();
    if (!users[username]) return { success: false, error: 'User not found' };
    
    var first = (firstName || '').trim();
    if (!first) return { success: false, error: 'First name is required' };
    
    users[username].firstName = first;
    users[username].middleName = (middleName || '').trim();
    users[username].lastName = (lastName || '').trim();
    users[username].updatedAt = new Date().toISOString();
    
    if (!this.saveUsers(users)) {
        return { success: false, error: 'Failed to save profile. Please try again.' };
    }
    return { success: true };
};

Auth.prototype.resetPassword = function(oldPassword, newPassword) {
    var username = this.getCurrentUser();
    if (!username) return { success: false, error: 'Not logged in' };
    
    var users = this.getUsers();
    if (!users[username]) return { success: false, error: 'User not found' };
    
    if (users[username].password !== oldPassword) {
        return { success: false, error: 'Current password is incorrect' };
    }
    
    var pwValidation = this.validatePassword(newPassword);
    if (!pwValidation.valid) return { success: false, error: pwValidation.error };
    
    users[username].password = newPassword;
    users[username].updatedAt = new Date().toISOString();
    
    if (!this.saveUsers(users)) {
        return { success: false, error: 'Failed to save password. Please try again.' };
    }
    return { success: true };
};

Auth.prototype.resetPasswordByEmail = function(email, newPassword) {
    var emailValidation = this.validateEmail(email);
    if (!emailValidation.valid) return { success: false, error: emailValidation.error };
    
    var key = emailValidation.email;
    var users = this.getUsers();
    
    if (!users[key]) {
        return { success: false, error: 'No account found with this email' };
    }
    
    var pwValidation = this.validatePassword(newPassword);
    if (!pwValidation.valid) return { success: false, error: pwValidation.error };
    
    users[key].password = newPassword;
    users[key].updatedAt = new Date().toISOString();
    
    if (!this.saveUsers(users)) {
        return { success: false, error: 'Failed to reset password. Please try again.' };
    }
    return { success: true };
};

Auth.prototype.updateProfilePicture = function(dataUrl) {
    var username = this.getCurrentUser();
    if (!username) {
        console.error('No user logged in for profile picture update');
        return false;
    }
    
    var users = this.getUsers();
    if (!users[username]) {
        console.error('User not found for profile picture update');
        return false;
    }
    
    // Validate dataUrl is actually a data URL
    if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
        console.error('Invalid image data');
        return false;
    }
    
    users[username].profilePicture = dataUrl;
    users[username].updatedAt = new Date().toISOString();
    
    return this.saveUsers(users);
};

Auth.prototype.getProfilePicture = function() {
    var username = this.getCurrentUser();
    if (!username) return null;
    
    var users = this.getUsers();
    if (!users[username]) return null;
    
    return users[username].profilePicture || null;
};

Auth.prototype.migrateAnonymousPins = function() {
    var anonKey = 'printverse_pinned';
    try {
        var anonData = localStorage.getItem(anonKey);
        if (anonData) {
            var parsed = JSON.parse(anonData);
            if (Array.isArray(parsed) && parsed.length > 0) {
                var userPinned = this.getUserPinned() || [];
                var merged = userPinned.concat(parsed);
                if (this.saveUserPinned(merged)) {
                    localStorage.removeItem(anonKey);
                    console.log('Migrated ' + parsed.length + ' anonymous pins to account');
                }
            }
        }
    } catch (e) {
        console.error('Error migrating anonymous pins:', e);
    }
};

Auth.prototype.deleteAccount = function(password) {
    var username = this.getCurrentUser();
    if (!username) return { success: false, error: 'Not logged in' };
    
    var users = this.getUsers();
    if (!users[username]) return { success: false, error: 'User not found' };
    
    if (users[username].password !== password) {
        return { success: false, error: 'Incorrect password' };
    }
    
    delete users[username];
    if (!this.saveUsers(users)) {
        return { success: false, error: 'Failed to delete account' };
    }
    
    this.logout();
    return { success: true };
};

Auth.prototype.exportAccountData = function() {
    var username = this.getCurrentUser();
    if (!username) return null;
    
    var users = this.getUsers();
    if (!users[username]) return null;
    
    var userData = users[username];
    return {
        email: username,
        firstName: userData.firstName,
        middleName: userData.middleName || '',
        lastName: userData.lastName,
        pinned: userData.pinned || [],
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
        exportedAt: new Date().toISOString()
    };
};

// Initialize auth instance
var auth = new Auth();
