DELIMITER $$
CREATE OR REPLACE PROCEDURE deleteUser(IN _id VARCHAR(255)) 

BEGIN 
	
	UPDATE users SET status = false WHERE id = _id;	 
	 
END$$

DELIMITER ;