package com.gokul.instaclone

import android.graphics.Color
import android.os.Bundle
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val root = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL; setBackgroundColor(Color.BLACK) }
        val title = TextView(this).apply { text = "InstaClone"; textSize = 28f; setTextColor(Color.WHITE); setPadding(24,32,24,24) }
        val feed = TextView(this).apply { text = "Stories\n\n🏠 Home Feed\n\n❤️  1,284 likes     💬 42 comments\n\nExplore     Reels     Messages     Profile"; textSize = 18f; setTextColor(Color.WHITE); setPadding(24,24,24,24) }
        root.addView(title); root.addView(feed, LinearLayout.LayoutParams(-1,0,1f))
        setContentView(root)
    }
}
