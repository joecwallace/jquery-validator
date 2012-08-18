<?php namespace Jquery_Validator;

class Form extends \Laravel\Form {

	public static $rules = array();

	public static function open($action = null, $method = 'POST', $attributes = array(), $https = null, $rules = array())
	{
		static::$rules = $rules;
		return parent::open($action, $method, $attributes, $https);
	}

	public static function input($type, $name, $value = null, $attributes = array())
	{
		$attributes = static::merge_rules($name, $attributes);
		return parent::input($type, $name, $value, $attributes);
	}

	public static function textarea($name, $value = '', $attributes = array())
	{
		$attributes = static::merge_rules($name, $attributes);
		return parent::textarea($type, $name, $value, $attributes);
	}

	public static function select($name, $options = array(), $selected = null, $attributes = array())
	{
		$attributes = static::merge_rules($name, $attributes);
		return parent::select($type, $name, $value, $attributes);
	}

	protected static function merge_rules($name, $attributes)
	{
		if (array_key_exists($name, static::$rules))
		{
			return array_merge($attributes, array(
				'data-validations' => static::$rules[$name] ?: '',
			));
		}

		return $attributes;
	}

}