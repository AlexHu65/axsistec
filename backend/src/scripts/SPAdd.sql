DELIMITER $$
CREATE OR REPLACE PROCEDURE userAddOrEdit( IN _id VARCHAR(255), IN _email VARCHAR(255), IN _user VARCHAR(255), IN _password VARCHAR(255), IN _status TINYINT, IN _gender TEXT, IN _date DATETIME ) 

BEGIN 
	IF (SELECT id FROM users WHERE id = _id AND status = true) THEN 
		UPDATE users 
		SET email = _email, 
			user = _user, 
			gender = _gender
		WHERE id = _id; 
		 
	ELSE 
		INSERT INTO users (id, email, user, password, status, gender, date) 
		VALUES (_id, _email, _user, _password, _status, _gender, _date); 
	END IF; 
END$$

DELIMITER ;