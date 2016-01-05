<?php
/**
 * @author Mary Neza Melencion
 */

include_once('lib/DB.php');

class Database extends DB
{
	private $mysqli;
	
	protected $_table = '';
	
	public function __construct() 
	{
		$db = DB::getInstance();
		$this->mysqli = $db->getConnection();
	}
	
	public function get_all()
	{
		$rows = array();
		
		$res = $this->mysqli->query("SELECT * FROM {$this->_table}");
		
		while($row = $res->fetch_array(MYSQLI_ASSOC))
		{
			$rows[] = $row;
		}
		return $rows;
	}
	
	public function get_by_id($id)
	{
		$res = $this->mysqli->query("SELECT * FROM {$this->_table} WHERE id = " . $this->check_sql_inject($id));
		return $res->fetch_array(MYSQLI_ASSOC);
	}
	
	public function delete_by_id($id)
	{
		$query = "DELETE FROM {$this->_table} WHERE id = " . $this->check_sql_inject($id);
		 
		if ( $this->mysqli->query($query) === TRUE )
		{
			return true;
		} else {
			return false;
		}
	}
	
	public function save($id, $data)
	{
		$query = "UPDATE {$this->_table} SET $data WHERE id = " . $this->check_sql_inject($id);
		if ( $this->mysqli->query($query) )
		{
			return true;
		} else {
			return false;
		}
	}
	
	public function insert($fields, $value)
	{
		$query = "INSERT INTO {$this->_table} (". $fields .")
					VALUES (". $value .")";
			
		if ( $this->mysqli->query($query) === TRUE)
		{
			return true;
		} else {
			return false;
		}
	}
	
	private function check_sql_inject($value)
	{
		// Stripslashes
		$value = trim($value);
		if (get_magic_quotes_gpc())
		{
			$value = stripslashes($value);
		}
	
		// Quote if not a number
		if (!is_numeric($value))
		{
			$value = "'" . mysql_real_escape_string($value) . "'";
		}
		return $value;
	}
}