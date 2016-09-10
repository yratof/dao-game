#pragma strict
var offset :Vector3;
var scale :Vector3 = new Vector3( 175, 175, 1);
var playing_piece :RectTransform;
private var p1_pieces :Array;
private var p2_pieces :Array;

var p2_image :Sprite;

private var player_playing :int = 0;
function v23( x :float, y:float ) {
//Debug.Log( Vector3( x * scale.x + offset.x, y * scale.y + offset.y, offset.z ) );
	return Vector3( x * scale.x + offset.x, y * scale.y + offset.y, offset.z );
}
function Start () {
	var piece :Transform;
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
		// Player 2 piece
		piece = Instantiate( playing_piece, Vector3(), Quaternion.identity );
		piece.SetParent( transform );
		p2_pieces.push( piece );
		piece.localPosition = v23( i, 3-i );
		piece.localScale = Vector3(1,1,1);

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

function MouseClicked( e: UnityEngine.EventSystems.BaseEventData ) {
	Debug.Log( e.selectedObject );
	Debug.Log( e );
	// e.selectedObject.transform.position.x = e.selectedObject.transform.position.x + 20;
	Debug.Log('test');
}