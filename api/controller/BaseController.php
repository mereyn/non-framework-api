<?php
/**
 *  @author Mary Neza Melencion
 */

include_once('lib/Database.php');

class BaseController extends Database 
{
	private $_code = 200;
	public $_content_type = "application/json";
	
	public function __construct() 
	{
		parent::__construct();
	}
	
	public function convert_date_ ($format = "Y-m-d", $month, $day = 1, $year = 2008)
	{
		$timestamp = mktime(0,0,0, $month, $day, $year);
		$converted_date = date ($format, $timestamp);
	}
	
	public function convert_date($date)
	{
		$convert = date("Y-m-d",strtotime($date));
		return $convert;
	}
	
	public function array_to_json($data)
	{
		if(is_array($data)){ 
			return json_encode($data);
		}
	}
	
	public function json_response($response, $message="") 
	{
		$arr = array('response' => $response, 'message' => $message);
		return $arr;
	}
	
	//-----------------------------------
	// HTTP RESPONSE
	//-----------------------------------
	public function response($data,$status)
	{
		$this->_code = ($status)?$status:200;
		$this->set_headers();
		echo $data;
		exit;
	}

	private function set_headers()
	{
		header("HTTP/1.1 ".$this->_code." ".$this->get_status_message());
		header("Content-Type:".$this->_content_type);
	}
	
	private function get_status_message()
	{
		$status = array(
				200 => 'OK',
				201 => 'Created',
				204 => 'No Content',
				400 => 'Bad Request',
				404 => 'Not Found',
				406 => 'Not Acceptable');
		return ($status[$this->_code])?$status[$this->_code]:$status[500];
	}
}
