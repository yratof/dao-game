#pragma strict
var offset:Vector3;
var scale:Vector3;
var player_1_piece:Transform;
var player_2_piece:Transform;
private var p1_pieces:Array;
private var p2_pieces:Array;
function v23( x :float, y:float ) {
	return Vector3( x * scale.x + offset.x, y * scale.y + offset.y, offset.z );
}
function Start () {
	var piece : Transform;
	p1_pieces = new Array();
	p2_pieces = new Array();
	// Create 4 pieces for each player
	for ( var i = 0; i < 4; i ++ ) {
		// Player 1 piece
		piece = Instantiate( player_1_piece, v23( i, i ), Quaternion.identity );
		piece.parent = gameObject.transform;
		p1_pieces.push( piece );
		// Player 2 piece
		piece = Instantiate( player_2_piece, v23( i, 3-i ), Quaternion.identity );
		piece.parent = gameObject.transform;
		p2_pieces.push( piece );
	}
}

function Update () {

}