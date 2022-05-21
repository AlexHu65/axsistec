DELIMITER $$
CREATE OR REPLACE PROCEDURE getUsers() 

BEGIN 
	
	SELECT id, email, user, status, date, gender FROM users WHERE status = true;
		 
	 
END$$

DELIMITER ;