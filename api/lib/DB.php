<?php
class DB
{
	// Hold the class instance.
	private static $_instance = null;
	private $_connection;
	private $config;

	// The db connection is established in the private constructor.
	private function __construct()
	{
		include_once('config/database.php');
		$this->config = $config;

		$this->_connection = new mysqli($this->config['hostname'], $this->config['username'],
				$this->config['password'], $this->config['dbname']);
		
		// Error handling
		if(mysqli_connect_error()) {
			trigger_error("Failed to conencto to MySQL: " . mysql_connect_error(),
					E_USER_ERROR);
		}
	}

	public static function getInstance()
	{
		if(!self::$_instance) { // If no instance then make one
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function getConnection()
	{
		return $this->_connection;
	}
	
	// Magic method clone is empty to prevent duplication of connection
	private function __clone() { }
}