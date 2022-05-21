DELIMITER $$
CREATE OR REPLACE PROCEDURE editPass( IN _id VARCHAR(255), IN _password VARCHAR(255)) 

BEGIN 
	IF (SELECT id FROM users WHERE id = _id) THEN 
		UPDATE users 
		SET password = _password 
		WHERE id = _id; 
	END IF; 
END$$

DELIMITER ;