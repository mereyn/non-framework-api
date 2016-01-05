<?php
include_once('config/api.php');
include_once('controller/ProductController.php');

$product = new ProductController();

if (isset($_GET['apikey'])) 
{
	if ($_GET['apikey'] == $config['api_key']) 
	{
		if (isset($_GET['method']))
		{
			switch ($_GET['method'])
			{
				case "get":
					if (isset($_GET['id']))
					{
						$id = $_GET['id'];
						$product->get($id);
					}
					else {
						$product->get();
					}
					break;
						
				case "post":
					$data = json_decode(file_get_contents("php://input"),true);
					if (isset($data['product']['id']) && (int) $data['product']['id'] > 0) {
						$product->update($data['product']);
					} else {
						$product->create($data['product']);
					}
					break;
						
				case "delete":
					if (isset($_GET['id']))
					{
						$id = $_GET['id'];
						$product->delete($id);
					}
					break;
			}
		}
		else 
		{
			echo "No method to access";
		}
		
	} //end of if condition authorize api key 
	else 
	{
		echo "Not authorize to access API service";
	}
} 
else 
{
	echo "Not authorize to access API service";
}