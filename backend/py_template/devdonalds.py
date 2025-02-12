from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
import re

# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
	name: str

@dataclass
class RequiredItem():
	name: str
	quantity: int

@dataclass
class Recipe(CookbookEntry):
	required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
	cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = None

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
	data = request.get_json()
	recipe_name = data.get('input', '')
	parsed_name = parse_handwriting(recipe_name)
	if parsed_name is None:
		return 'Invalid recipe name', 400
	return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def parse_handwriting(recipeName: str) -> Union[str | None]:
	goodRecipeName = ''
	t = False
	for cha in recipeName:
		if len(goodRecipeName) != 0:
			lastCha = goodRecipeName[-1]
		else:
			lastCha = 'anything'
		if cha == '-' or cha == '_' or cha == ' ':
			if lastCha != ' ':
				goodRecipeName += ' '
		elif cha.isalpha():
			if t == False:
				goodRecipeName += cha.upper()
				t = True
			elif lastCha == ' ':
				goodRecipeName += cha.upper()
			else:
				goodRecipeName += cha.lower()
	if len(goodRecipeName) == 0:
		return None
	recipeName = goodRecipeName
	return recipeName


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route('/entry', methods=['POST'])
def create_entry():
	data = request.get_json()
	entries_type = data.get('type', '')
	entries_name = data.get('name', '')
	if entries_type != 'recipe' and entries_type != 'ingredient':
		return 'Invalid type', 400
	if entries_name in cookbook:
		return 'Entry names already exists', 400
	if entries_type == 'ingredient':
		cookTime = data.get('cookTime', '')
		if cookTime <= 0:
			return 'Invalid cookTime', 400
	cookbook[entries_name] = data
	return 'implemented successfully', 200


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
	recipe_name = request.args.get('name', '')
	if recipe_name not in cookbook:
		return 'Recipe not found', 400
	recipe = cookbook[recipe_name]
	if recipe['type'] != 'recipe':
		return 'Invalid type', 400
	total_cook_time = 0
	ingredients = {}
	return 'not implemented', 500


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
	app.run(debug=True, port=8080)
