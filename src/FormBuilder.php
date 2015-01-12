<?php namespace JqueryValidator;

use Illuminate\Html\FormBuilder as IlluminateFormBuilder;

class FormBuilder extends IlluminateFormBuilder {

	protected $rules = [];

	/**
	 * Add validation rules to an HTML form's inputs.
	 *
	 * @param  array $rules
	 * @return null
	 */
	public function validate(array $rules)
	{
		$this->rules = $rules;

		return $this;
	}

	/**
	 * Create a form input field.
	 *
	 * @param  string  $type
	 * @param  string  $name
	 * @param  string  $value
	 * @param  array   $options
	 * @return string
	 */
	public function input($type, $name, $value = null, $options = array())
	{
		$options = $this->addValidationRulesToOptions($name, $options);

		return parent::input($type, $name, $value, $options);
	}

	/**
	 * Merge the data-validation rules into the input's options.
	 *
	 * @param  string $name
	 * @param  array  $options
	 * @return array
	 */
	protected function addValidationRulesToOptions($name, $options)
	{
		if ($this->hasRulesFor($name)) {
			return array_merge($options, [
				'data-validations' => $this->getRulesFor($name),
			]);
		}

		return $options;
	}

	/**
	 * Check if there are rules for an input.
	 *
	 * @param  string $name
	 * @return boolean
	 */
	protected function hasRulesFor($name)
	{
		return array_key_exists($name, $this->rules);
	}

	/**
	 * Get a rules string for the name.
	 *
	 * @param  string $name
	 * @return string
	 */
	protected function getRulesFor($name)
	{
		return $this->hasRulesFor($name) ? $this->rules[$name] : '';
	}

}
