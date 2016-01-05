<?php
/**
 * @author Mary Neza Melencion
 */
include_once('controller/BaseController.php');

class ProductController extends BaseController {

	protected $_table = 'products';

	public function __construct()
	{
		parent::__construct();
	}

	public function get($id=NULL)
	{
		if ($id == NULL) {
			$products = $this->get_all();
			
			if (! $products ) {
				$this->response('',204);	// If no records "No Content" status
			} else {
				$this->response($this->array_to_json($products), 200); // send product
			}
		} else {
			$id = (int) $id;
			$product = $this->get_by_id($id);
			
			if (! $product ) {
				$this->response('',204);	// If no records "No Content" status
			} else {
				$this->response($this->array_to_json($product), 200); // send product
			}
		}

	}

	public function delete($id=NULL)
	{
		$id = (int) $id;

		if ($id <= 0)
		{
			$this->response($this->array_to_json($this->json_response("error", "Invalid id.")), 400);
		} 
		else 
		{
			if ( $this->delete_by_id($id) ) 
			{
				$this->response($this->array_to_json($this->json_response("success", "Successfully deleted product.")), 200);
			} else {
				$this->response($this->array_to_json($this->json_response("error", "Failed to delete product.")), 406);
			}
		}
	}
	
	public function update($data)
	{
		$id = (int) $data['id'];
		
		$product_name = $data['product_name'];
		$product_code = $data['product_code'];
		$product_price = $data['product_price'];
		
		$data = "product_name='".$product_name."'".", product_code='".$product_code."'".", product_price=".$product_price;
		
		if ($id <= 0)
		{
			$this->response($this->array_to_json($this->json_response("error", "Invalid id.")), 400);
		} 
		else 
		{
			// update the product by id
			if ( $this->save($id, $data) )
			{
				$this->response($this->array_to_json(['data' => $data, 'response' => 'success', 'message' => 'Successfully updated product.']), 200); // send product
			} else {
				$this->response($this->array_to_json($this->json_response("error", "Failed to update product.")), 406);
			}
		}
	}

	public function create($data)
	{
		$product_name = $data['product_name'];
		$product_code = $data['product_code'];
		$product_price = $data['product_price'];

		$fields = "product_name, product_code, product_price";
		$value = "'".$product_name."', "."'".$product_code."', "."'".$product_price."'";
		
		if ( $this->insert($fields, $value) )
		{
			$this->response($this->array_to_json(['data' => $data, 'response' => 'success', 'message' => 'Successfully created new product.']), 200); // send product
		} else {
			$this->response($this->array_to_json($this->json_response("error", "Failed to create new product.")), 406);
		}
	}
}