#pragma strict
var offset :Vector3;
var scale :Vector3 = new Vector3( 175, 175, 1);
var playing_piece :Transform;
private var p1_pieces :Array;
private var p2_pieces :Array;
public var board = [
	[1,0,0,2],
	[0,1,2,0],
	[0,2,1,0],
	[2,0,0,1]
];

var team_turn :int = 1;

var selector:Transform;
var predictor:Transform;

var p2_image :Sprite;

private var player_playing :int = 0;
function v23( xy :Vector2 ) {
	return v23( xy.x, xy.y );
}
function v23( x :float, y:float ) {
//Debug.Log( Vector3( x * scale.x + offset.x, y * scale.y + offset.y, offset.z ) );
	return Vector3( x * scale.x + offset.x, y * scale.y + offset.y, offset.z );
}
function Start () {
	var piece :Transform;
	var pp : PlayerPiece;
	p1_pieces = new Array();
	p2_pieces = new Array();

	// Create 4 pieces for each player
	for ( var i = 0; i < 4; i ++ ) {
		// Player 1 piece
		piece = Instantiate( playing_piece, Vector3(), Quaternion.identity );
		piece.SetParent( transform );
		p1_pieces.push( piece );
		piece.localPosition = v23( i, i );
		piece.localScale = Vector3(1,1,1);
		pp = piece.gameObject.GetComponent( PlayerPiece );
		pp.selector =  selector;
		pp.predictor = predictor;
		pp.team = 1;
		pp.game = this;
		pp.board_pos = Vector2( i, i );

		// Player 2 piece
		piece = Instantiate( playing_piece, Vector3(), Quaternion.identity );
		piece.SetParent( transform );
		p2_pieces.push( piece );
		piece.localPosition = v23( i, 3-i );
		piece.localScale = Vector3(1,1,1);
		pp = piece.gameObject.GetComponent( PlayerPiece );
		pp.selector =  selector;
		pp.predictor = predictor;
		pp.team = 2;
		pp.game = this;
		pp.board_pos = Vector2( i, 3-i );

		// Get all components of type Image that are children of this GameObject.
		var images = piece.GetComponentsInChildren.<UnityEngine.UI.Image>();
		// Loop through each image and set it's Sprite to the other Sprite.
		for ( var image in images ) {
			image.sprite = p2_image;
		}
	}
}

function Update () {

}

function can_move( piece_team : int ) {
	return team_turn == piece_team;
}

function is_legal_move( pos : Vector2 ) {
	if ( 0 > pos.x )
		return false;
	if ( 4 <= pos.x )
		return false;
	if ( 0 > pos.y )
		return false;
	if ( 4 <= pos.y )
		return false;
	return 0 == board[pos.y][pos.x];
}